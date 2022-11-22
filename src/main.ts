// Components
export { default as Account } from './components/Account/Account.vue';
export { default as AccountDetails } from './components/AccountDetails/AccountDetails.vue';
export { default as AccountList } from './components/AccountList/AccountList.vue';
export { default as AccountRing } from './components/AccountRing/AccountRing.vue';
export { default as AccountSelector } from './components/AccountSelector/AccountSelector.vue';
export { default as AddressDisplay } from './components/AddressDisplay/AddressDisplay.vue';
export { default as AddressInput } from './components/AddressInput/AddressInput.vue';
export { default as Amount } from './components/Amount/Amount.vue';
export { default as AmountInput } from './components/AmountInput/AmountInput.vue';
export { default as AmountWithFee } from './components/AmountWithFee/AmountWithFee.vue';
export { default as BottomOverlay } from './components/BottomOverlay/BottomOverlay.vue';
export { default as Carousel } from './components/Carousel/Carousel.vue';
export { default as CircleSpinner } from './components/CircleSpinner/CircleSpinner.vue';
export { default as CloseButton } from './components/CloseButton/CloseButton.vue';
export { default as Copyable } from './components/Copyable/Copyable.vue';
export { default as CopyableField } from './components/CopyableField/CopyableField.vue';
export { default as FiatAmount } from './components/FiatAmount/FiatAmount.vue';
export { default as Identicon } from './components/Identicon/Identicon.vue';
export { default as LabelInput } from './components/LabelInput/LabelInput.vue';
export { default as LoadingSpinner } from './components/LoadingSpinner/LoadingSpinner.vue';
export { default as PageBody } from './components/PageBody/PageBody.vue';
export { default as PageFooter } from './components/PageFooter/PageFooter.vue';
export { default as PageHeader } from './components/PageHeader/PageHeader.vue';
export { default as PaymentInfoLine } from './components/PaymentInfoLine/PaymentInfoLine.vue';
export { default as QrCode } from './components/QrCode/QrCode.vue';
export { default as QrScanner } from './components/QrScanner/QrScanner.vue';
export { default as SelectBar } from './components/SelectBar/SelectBar.vue';
export { default as SmallPage } from './components/SmallPage/SmallPage.vue';
export { default as Timer } from './components/Timer/Timer.vue';
export { default as Tooltip } from './components/Tooltip/Tooltip.vue';

// Comment out unused icons in the components/Icons.ts file
export * from './components/Icons';

// export { default as I18nMixin } from '../src.old/i18n/I18nMixin';

declare global {
    interface Window {
        __dynamicImportHandler__?: Function;
        __dynamicImportPreload__?: Function;
    }
}

// /**
//  * Set a specific public path / base path from where assets like identicons should be loaded.
//  * By default, this is the path from where the importing script is loaded,
//  * derived from the importing script's currentScript src.
//  *
//  * Optionally, you can define a different path for image assets.
//  */
export function setAssetPublicPath(path: string, imageAssetsPath?: string) {

    window.__dynamicImportHandler__ = function(importer: string) {
        console.debug('__dynamicImportHandler__: ', importer);

        return customImportHandler(importer, path, imageAssetsPath);
    }

    window.__dynamicImportPreload__ = function(preloads: string[]) {
        console.debug('__dynamicImportPreload__: ', preloads);

        return preloads.map(preload => customImportHandler(preload, path, imageAssetsPath));
    }
}

function customImportHandler(importerOrPreload: string, path: string, imageAssetsPath?: string) {

    if (typeof imageAssetsPath === 'string' && importerOrPreload.endsWith('.svg')) {
        return `${imageAssetsPath}${!imageAssetsPath.endsWith('/') ? '/' : ''}` + importerOrPreload;
    }

    return `${path}${!path.endsWith('/') ? '/' : ''}` + importerOrPreload;
}
