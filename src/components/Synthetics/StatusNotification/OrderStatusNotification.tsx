import { t } from "@lingui/macro";
import cx from "classnames";
import { TransactionStatus, TransactionStatusType } from "components/TransactionStatus/TransactionStatus";
import { getWrappedToken } from "config/tokens";
import { PendingOrderData, getPendingOrderKey, useSyntheticsEvents } from "context/SyntheticsEvents";
import { MarketsInfoData } from "domain/synthetics/markets";
import {
  isDecreaseOrderType,
  isIncreaseOrderType,
  isLimitOrderType,
  isLimitSwapOrderType,
  isMarketOrderType,
  isSwapOrderType,
  isTriggerDecreaseOrderType,
} from "domain/synthetics/orders";
import { TokensData } from "domain/synthetics/tokens";
import { getSwapPathOutputAddresses } from "domain/synthetics/trade";
import { useChainId } from "lib/chains";
import { formatTokenAmount, formatUsd } from "lib/numbers";
import { getByKey } from "lib/objects";
import { useEffect, useMemo, useState } from "react";
import "./StatusNotification.scss";
import { useToastAutoClose } from "./useToastAutoClose";
import { getTriggerNameByOrderType } from "domain/synthetics/positions";
import ExternalLink from "components/ExternalLink/ExternalLink";
import { cancelOrdersTxn } from "domain/synthetics/orders/cancelOrdersTxn";
import useWallet from "lib/wallets/useWallet";
import {
  useIsLastSubaccountAction,
  useSubaccount,
  useSubaccountCancelOrdersDetailsMessage,
} from "context/SubaccountContext/SubaccountContext";
import { getExplorerUrl } from "config/chains";
import { ImSpinner2 } from "react-icons/im";

type Props = {
  toastTimestamp: number;
  pendingOrderData: PendingOrderData;
  marketsInfoData?: MarketsInfoData;
  tokensData?: TokensData;
  hideTxStatus?: boolean;
};

export function OrderStatusNotification({
  pendingOrderData,
  marketsInfoData,
  tokensData,
  toastTimestamp,
  hideTxStatus = false,
}: Props) {
  const { chainId } = useChainId();
  const wrappedNativeToken = getWrappedToken(chainId);
  const { orderStatuses, setOrderStatusViewed } = useSyntheticsEvents();

  const [orderStatusKey, setOrderStatusKey] = useState<string>();

  const pendingOrderKey = useMemo(() => getPendingOrderKey(pendingOrderData), [pendingOrderData]);
  const orderStatus = getByKey(orderStatuses, orderStatusKey);

  const hasError = Boolean(orderStatus?.cancelledTxnHash);

  const orderData = useMemo(() => {
    if (!marketsInfoData || !orderStatuses || !tokensData || !wrappedNativeToken) {
      return undefined;
    }

    const marketInfo = getByKey(marketsInfoData, pendingOrderData.marketAddress);
    const initialCollateralToken = getByKey(tokensData, pendingOrderData.initialCollateralTokenAddress);
    const { outTokenAddress } = getSwapPathOutputAddresses({
      marketsInfoData,
      initialCollateralAddress: pendingOrderData.initialCollateralTokenAddress,
      swapPath: pendingOrderData.swapPath,
      wrappedNativeTokenAddress: wrappedNativeToken.address,
      shouldUnwrapNativeToken: pendingOrderData.shouldUnwrapNativeToken,
    });
    const targetCollateralToken = getByKey(tokensData, outTokenAddress);

    return {
      ...pendingOrderData,
      marketInfo,
      initialCollateralToken,
      targetCollateralToken,
    };
  }, [marketsInfoData, orderStatuses, pendingOrderData, tokensData, wrappedNativeToken]);

  const title = useMemo(() => {
    if (!orderData) {
      return t`Unknown order`;
    }

    if (isSwapOrderType(orderData.orderType)) {
      const { initialCollateralToken, targetCollateralToken, initialCollateralDeltaAmount, minOutputAmount } =
        orderData;

      const orderTypeText = isLimitSwapOrderType(orderData.orderType) ? t`Limit Swap` : t`Swap`;

      return t`${orderTypeText} ${formatTokenAmount(
        initialCollateralDeltaAmount,
        initialCollateralToken?.decimals,
        initialCollateralToken?.symbol
      )} for ${formatTokenAmount(minOutputAmount, targetCollateralToken?.decimals, targetCollateralToken?.symbol)}`;
    } else {
      const { marketInfo, sizeDeltaUsd, orderType, isLong, initialCollateralDeltaAmount, initialCollateralToken } =
        orderData;

      const longShortText = isLong ? t`Long` : t`Short`;
      const positionText = `${marketInfo?.indexToken.symbol} ${longShortText}`;

      if (sizeDeltaUsd.eq(0)) {
        const symbol = orderData.shouldUnwrapNativeToken
          ? initialCollateralToken?.baseSymbol
          : initialCollateralToken?.symbol;

        if (isIncreaseOrderType(orderType)) {
          return t`Depositing ${formatTokenAmount(
            initialCollateralDeltaAmount,
            initialCollateralToken?.decimals,
            symbol
          )} to ${positionText}`;
        } else {
          return t`Withdrawing ${formatTokenAmount(
            initialCollateralDeltaAmount,
            initialCollateralToken?.decimals,
            symbol
          )} from ${positionText}`;
        }
      } else {
        let orderTypeText = "";

        if (isMarketOrderType(orderType)) {
          orderTypeText = isIncreaseOrderType(orderType) ? t`Increasing` : t`Decreasing`;
        } else {
          if (isLimitOrderType(orderType)) {
            orderTypeText = t`Limit order for`;
          } else if (isDecreaseOrderType(orderType)) {
            orderTypeText = t`${getTriggerNameByOrderType(orderType, true)} order for`;
          }
        }

        const sign = isIncreaseOrderType(orderType) ? "+" : "-";

        return t`${orderTypeText} ${marketInfo?.indexToken?.symbol} ${longShortText}: ${sign}${formatUsd(
          sizeDeltaUsd
        )}`;
      }
    }
  }, [orderData]);

  const creationStatus = useMemo(() => {
    let text = t`Sending order request`;
    let status: TransactionStatusType = "loading";

    if (orderStatus?.createdTxnHash) {
      status = "success";
      text = t`Order request sent`;
    }

    return (
      <TransactionStatus
        status={status}
        txnHash={orderStatus?.createdTxnHash}
        text={text}
        hideTxStatus={hideTxStatus}
      />
    );
  }, [orderStatus?.createdTxnHash, hideTxStatus]);

  const executionStatus = useMemo(() => {
    if (!orderData || !isMarketOrderType(orderData?.orderType)) {
      return null;
    }

    let text = t`Fulfilling order request`;
    let status: TransactionStatusType = "muted";
    let txnHash: string | undefined;

    if (orderStatus?.createdTxnHash) {
      status = "loading";
    }

    if (orderStatus?.executedTxnHash) {
      text = t`Order executed`;
      status = "success";
      txnHash = orderStatus?.executedTxnHash;
    }

    if (orderStatus?.cancelledTxnHash) {
      text = t`Order cancelled`;
      status = "error";
      txnHash = orderStatus?.cancelledTxnHash;
    }

    return <TransactionStatus status={status} txnHash={txnHash} text={text} hideTxStatus={hideTxStatus} />;
  }, [
    orderData,
    orderStatus?.cancelledTxnHash,
    orderStatus?.createdTxnHash,
    orderStatus?.executedTxnHash,
    hideTxStatus,
  ]);

  useEffect(
    function getOrderStatusKey() {
      if (orderStatusKey) {
        return;
      }

      const matchedStatusKey = Object.values(orderStatuses).find((orderStatus) => {
        return !orderStatus.isViewed && getPendingOrderKey(orderStatus.data) === pendingOrderKey;
      })?.key;

      if (matchedStatusKey) {
        setOrderStatusKey(matchedStatusKey);
        setOrderStatusViewed(matchedStatusKey);
      }
    },
    [orderStatus, orderStatusKey, orderStatuses, pendingOrderKey, setOrderStatusViewed, toastTimestamp]
  );

  return (
    <div className={"StatusNotification"}>
      <div className="StatusNotification-content">
        <div className="StatusNotification-title">{title}</div>

        <div className="StatusNotification-items">
          {creationStatus}
          {executionStatus}
        </div>
      </div>

      <div className={cx("StatusNotification-background", { error: hasError })}>
        <div className="Notification-divider" />
      </div>
    </div>
  );
}

export function OrdersStatusNotificiation({
  pendingOrderData,
  marketsInfoData,
  tokensData,
  toastTimestamp,
  setPendingTxns,
}: {
  pendingOrderData: PendingOrderData | PendingOrderData[];
  marketsInfoData?: MarketsInfoData;
  tokensData?: TokensData;
  toastTimestamp: number;
  setPendingTxns: (txns: string[]) => void;
}) {
  const { chainId } = useChainId();
  const { signer } = useWallet();
  const { orderStatuses: allOrderStatuses, setOrderStatusViewed } = useSyntheticsEvents();
  const pendingOrders = useMemo(
    () => (Array.isArray(pendingOrderData) ? pendingOrderData : [pendingOrderData]),
    [pendingOrderData]
  );

  const [matchedOrderStatusKeys, setMatchedOrderStatusKeys] = useState<string[]>([]);

  const matchedOrderStatuses = useMemo(
    () => matchedOrderStatusKeys.map((key) => allOrderStatuses[key]),
    [allOrderStatuses, matchedOrderStatusKeys]
  );

  const orderByKey = useMemo(() => {
    const map = new Map<string, PendingOrderData>();
    pendingOrders.forEach((order) => {
      const key = getPendingOrderKey(order);
      map.set(key, order);
    });
    return map;
  }, [pendingOrders]);

  useEffect(() => {
    Object.values(allOrderStatuses).forEach((orderStatus) => {
      const key = getPendingOrderKey(orderStatus.data);

      if (orderStatus.isViewed || !orderByKey.has(key)) return;

      setMatchedOrderStatusKeys((prev) => [...prev, orderStatus.key]);
      setOrderStatusViewed(orderStatus.key);
    });
  }, [allOrderStatuses, orderByKey, setOrderStatusViewed]);

  const isCompleted = useMemo(() => {
    return pendingOrders.every((pendingOrder) => {
      const orderStatus = matchedOrderStatuses.find(
        (status) => getPendingOrderKey(status.data) === getPendingOrderKey(pendingOrder)
      );
      return isMarketOrderType(pendingOrder.orderType)
        ? Boolean(orderStatus?.executedTxnHash)
        : Boolean(orderStatus?.createdTxnHash);
    });
  }, [matchedOrderStatuses, pendingOrders]);

  const isMarketOrLimitOrderFailed = useMemo(() => {
    return pendingOrders.some((pendingOrder) => {
      if (isMarketOrderType(pendingOrder.orderType) || isLimitOrderType(pendingOrder.orderType)) {
        const orderStatusKey = getPendingOrderKey(pendingOrder);
        const orderStatus = matchedOrderStatuses.find((status) => getPendingOrderKey(status.data) === orderStatusKey);
        return orderStatus?.cancelledTxnHash !== undefined;
      }
      return false;
    });
  }, [matchedOrderStatuses, pendingOrders]);

  const triggerOrderKeys = useMemo(() => {
    return pendingOrders.reduce((result, order) => {
      if (isTriggerDecreaseOrderType(order.orderType)) {
        const key = getPendingOrderKey(order);
        const orderStatus = matchedOrderStatuses.find((status) => getPendingOrderKey(status.data) === key);
        if (orderStatus?.createdTxnHash && orderStatus?.key) {
          result.push(orderStatus.key);
        }
      }
      return result;
    }, [] as string[]);
  }, [matchedOrderStatuses, pendingOrders]);

  const subaccount = useSubaccount(null, triggerOrderKeys.length);
  const cancelOrdersDetailsMessage = useSubaccountCancelOrdersDetailsMessage(undefined, triggerOrderKeys.length);
  const isLastSubaccountAction = useIsLastSubaccountAction();

  const showTxStatus = pendingOrders.length > 1;

  useToastAutoClose(isCompleted, toastTimestamp);

  function onCancelOrdersClick() {
    if (!signer || !triggerOrderKeys.length || !setPendingTxns) return;
    cancelOrdersTxn(chainId, signer, subaccount, {
      orderKeys: triggerOrderKeys,
      setPendingTxns,
      isLastSubaccountAction,
      detailsMsg: cancelOrdersDetailsMessage,
    });
  }

  const txsStatus = useMemo(() => {
    return pendingOrders.reduce(
      (result, order) => {
        const orderStatus = matchedOrderStatuses.find(
          (status) => getPendingOrderKey(status.data) === getPendingOrderKey(order)
        );

        if (orderStatus?.cancelledTxnHash) {
          result.status = "error";
          result.cancelledTxnHash = orderStatus?.cancelledTxnHash;
        }

        if (orderStatus?.createdTxnHash) {
          result.createdTxnHash = orderStatus?.createdTxnHash;
        }

        if (orderStatus?.executedTxnHash) {
          result.status = "success";
          result.executedTxnHash = orderStatus?.executedTxnHash;
        }

        return result;
      },
      { status: "loading" } as {
        status: TransactionStatusType;
        createdTxnHash?: string;
        executedTxnHash?: string;
        cancelledTxnHash?: string;
      }
    );
  }, [matchedOrderStatuses, pendingOrders]);

  return (
    <div className="StatusNotification-wrapper">
      <div className="StatusNotification-list">
        {pendingOrders.map((order, index) => {
          return (
            <OrderStatusNotification
              key={index}
              pendingOrderData={order}
              marketsInfoData={marketsInfoData}
              tokensData={tokensData}
              toastTimestamp={toastTimestamp}
              hideTxStatus={showTxStatus}
            />
          );
        })}
      </div>
      {showTxStatus && (
        <div className="StatusNotification-actions">
          <div>
            {isMarketOrLimitOrderFailed && triggerOrderKeys.length > 0 && (
              <button onClick={onCancelOrdersClick} className="StatusNotification-cancel-all">
                Cancel all orders
              </button>
            )}
          </div>
          {txsStatus.status === "loading" && (
            <ImSpinner2 width={60} height={60} className="spin TransactionStatus-spin" />
          )}
          {txsStatus.executedTxnHash && (
            <ExternalLink href={`${getExplorerUrl(chainId)}tx/${txsStatus?.executedTxnHash}`}>View</ExternalLink>
          )}
        </div>
      )}
    </div>
  );
}
