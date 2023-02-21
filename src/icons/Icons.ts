/// <reference types="vite-svg-loader" />

import { Component, defineComponent, h } from 'vue';

const IconBase = (component: Component) => defineComponent({
    functional: true,
    render: () => h(component, Object.assign({ class: 'nq-icon' })),
});

/**
 * SVG files in an /icons/ directory are automatically loaded as Vue components
 * via the vite-svg-loader.
 */
import AlertCircle from '@nimiq/style/src/icons/alert-circle.svg?component';
import AlertTriangle from '@nimiq/style/src/icons/alert-triangle.svg?component';
import ArrowLeftSmall from '@nimiq/style/src/icons/arrow-left-small.svg?component';
import ArrowLeft from '@nimiq/style/src/icons/arrow-left.svg?component';
import ArrowRightSmall from '@nimiq/style/src/icons/arrow-right-small.svg?component';
import ArrowRight from '@nimiq/style/src/icons/arrow-right.svg?component';
import CaretRightSmall from '@nimiq/style/src/icons/caret-right-small.svg?component';
import Cashlink from '@nimiq/style/src/icons/cashlink.svg?component';
import CashlinkSmall from '@nimiq/style/src/icons/cashlink-small.svg?component';
import CashlinkXSmall from '@nimiq/style/src/icons/cashlink-xsmall.svg?component';
import Checkmark from '@nimiq/style/src/icons/checkmark.svg?component';
import CheckmarkSmall from '@nimiq/style/src/icons/checkmark-small.svg?component';
import Close from '@nimiq/style/src/icons/close.svg?component';
import Contacts from '@nimiq/style/src/icons/contacts.svg?component';
import Copy from '@nimiq/style/src/icons/copy.svg?component';
import Cross from '@nimiq/style/src/icons/cross.svg?component';
import Download from '@nimiq/style/src/icons/download.svg?component';
import FaceNeutral from '@nimiq/style/src/icons/face-neutral.svg?component';
import FaceSad from '@nimiq/style/src/icons/face-sad.svg?component';
import Gear from '@nimiq/style/src/icons/gear.svg?component';
import Hexagon from '@nimiq/style/src/icons/hexagon.svg?component';
import InfoCircle from '@nimiq/style/src/icons/info-circle.svg?component';
import InfoCircleSmall from '@nimiq/style/src/icons/info-circle-small.svg?component';
import Keys from '@nimiq/style/src/icons/keys.svg?component';
import Ledger from '@nimiq/style/src/icons/ledger.svg?component';
import LockLocked from '@nimiq/style/src/icons/lock-locked.svg?component';
import LockUnlocked from '@nimiq/style/src/icons/lock-unlocked.svg?component';
import Login from '@nimiq/style/src/icons/login.svg?component';
import MenuDots from '@nimiq/style/src/icons/menu-dots.svg?component';
import PlusCircle from '@nimiq/style/src/icons/plus-circle.svg?component';
import QrCode from '@nimiq/style/src/icons/qr-code.svg?component';
import Questionmark from '@nimiq/style/src/icons/questionmark.svg?component';
import ScanQrCode from '@nimiq/style/src/icons/scan-qr-code.svg?component';
import Settings from '@nimiq/style/src/icons/settings.svg?component';
import Stopwatch from '@nimiq/style/src/icons/stopwatch.svg?component';
import Transfer from '@nimiq/style/src/icons/transfer.svg?component';
import UnderPayment from '@nimiq/style/src/icons/under-payment.svg?component';
import ViewOff from '@nimiq/style/src/icons/view-off.svg?component';
import View from '@nimiq/style/src/icons/view.svg?component';

/**
 * Comment out any unused icons here
 */
// tslint:disable:variable-name
export const AlertCircleIcon = IconBase(AlertCircle);
export const AlertTriangleIcon = IconBase(AlertTriangle);
export const ArrowLeftSmallIcon = IconBase(ArrowLeftSmall);
export const ArrowLeftIcon = IconBase(ArrowLeft);
export const ArrowRightSmallIcon = IconBase(ArrowRightSmall);
export const ArrowRightIcon = IconBase(ArrowRight);
export const CaretRightSmallIcon = IconBase(CaretRightSmall);
export const CashlinkIcon = IconBase(Cashlink);
export const CashlinkSmallIcon = IconBase(CashlinkSmall);
export const CashlinkXSmallIcon = IconBase(CashlinkXSmall);
export const CheckmarkIcon = IconBase(Checkmark);
export const CheckmarkSmallIcon = IconBase(CheckmarkSmall);
export const CloseIcon = IconBase(Close);
export const ContactsIcon = IconBase(Contacts);
export const CopyIcon = IconBase(Copy);
export const CrossIcon = IconBase(Cross);
export const DownloadIcon = IconBase(Download);
export const FaceNeutralIcon = IconBase(FaceNeutral);
export const FaceSadIcon = IconBase(FaceSad);
export const GearIcon = IconBase(Gear);
export const HexagonIcon = IconBase(Hexagon);
export const InfoCircleIcon = IconBase(InfoCircle);
export const InfoCircleSmallIcon = IconBase(InfoCircleSmall);
export const KeysIcon = IconBase(Keys);
export const LedgerIcon = IconBase(Ledger);
export const LockLockedIcon = IconBase(LockLocked);
export const LockUnlockedIcon = IconBase(LockUnlocked);
export const LoginIcon = IconBase(Login);
export const MenuDotsIcon = IconBase(MenuDots);
export const PlusCircleIcon = IconBase(PlusCircle);
export const QrCodeIcon = IconBase(QrCode);
export const QuestionmarkIcon = IconBase(Questionmark);
export const ScanQrCodeIcon = IconBase(ScanQrCode);
export const SettingsIcon = IconBase(Settings);
export const StopwatchIcon = IconBase(Stopwatch);
export const TransferIcon = IconBase(Transfer);
export const UnderPaymentIcon = IconBase(UnderPayment);
export const ViewOffIcon = IconBase(ViewOff);
export const ViewIcon = IconBase(View);
// tslint:enable:variable-name
