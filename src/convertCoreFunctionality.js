/*************************************************************************************
 * Product: ADempiere gRPC Business Data Client Convert Utils                        *
 * Copyright (C) 2012-2020 E.R.P. Consultores y Asociados, C.A.                      *
 * Contributor(s): Edwin Betancourt EdwinBetanc0urt@outlook.com                      *
 * This program is free software: you can redistribute it and/or modify              *
 * it under the terms of the GNU General Public License as published by              *
 * the Free Software Foundation, either version 3 of the License, or                 *
 * (at your option) any later version.                                               *
 * This program is distributed in the hope that it will be useful,                   *
 * but WITHOUT ANY WARRANTY; without even the implied warranty of                    *
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the                     *
 * GNU General Public License for more details.                                      *
 * You should have received a copy of the GNU General Public License                 *
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.            *
 ************************************************************************************/

const convertCoreFunctionality = {
  convertCountryFromGRPC(countryToConvert) {
    if (countryToConvert) {
      return {
        id: countryToConvert.getId(),
        uuid: countryToConvert.getUuid(),
        countryCode: countryToConvert.getCountrycode(),
        name: countryToConvert.getName(),
        description: countryToConvert.getDescription(),
        hasRegion: countryToConvert.getHasregion(),
        regionName: countryToConvert.getRegionname(),
        displaySequence: countryToConvert.getDisplaysequence(),
        isAddressLinesReverse: countryToConvert.getIsaddresslinesreverse(),
        captureSequence: countryToConvert.getCapturesequence(),
        displaySequenceLocal: countryToConvert.getDisplaysequencelocal(),
        isAddressLinesLocalReverse: countryToConvert.getIsaddresslineslocalreverse(),
        expressionPostal: countryToConvert.getExpressionpostal(),
        hasPostalAdd: countryToConvert.getHaspostaladd(),
        expressionPhone: countryToConvert.getExpressionphone(),
        mediaSize: countryToConvert.getMediasize(),
        expressionBankRoutingNo: countryToConvert.getExpressionbankroutingno(),
        expressionBankAccountNo: countryToConvert.getExpressionbankaccountno(),
        language: countryToConvert.getLanguage(),
        allowCitiesOutOfList: countryToConvert.getAllowcitiesoutoflist(),
        isPostcodeLookup: countryToConvert.getIspostcodelookup(),
        currency: convertCoreFunctionality.convertCurrencyFromGRPC(
          countryToConvert.getCurrency()
        )
      };
    }
    return undefined;
  },

  convertCurrencyFromGRPC(currencyToConvert) {
    if(currencyToConvert) {
      return {
        currencyId: currencyToConvert.getId(),
        currencyUuid: currencyToConvert.getUuid(),
        iSOCode: currencyToConvert.getIsocode(),
        curSymbol: currencyToConvert.getCursymbol(),
        description: currencyToConvert.getDescription(),
        stdPrecision: currencyToConvert.getStdprecision(),
        costingPrecision: currencyToConvert.getCostingprecision()
      };
    }
    return undefined;
  },

  convertOrganizationFromGRPC(organizationToConvert) {
    if (organizationToConvert) {
      return {
        id: organizationToConvert.getId(),
        uuid: organizationToConvert.getUuid(),
        name: organizationToConvert.getName(),
        description: organizationToConvert.getDescription(),
        isReadOnly: organizationToConvert.getIsreadonly(),
        duns: organizationToConvert.getDuns(),
        taxId: organizationToConvert.getTaxid(),
        phone: organizationToConvert.getPhone(),
        phone2: organizationToConvert.getPhone2(),
        fax: organizationToConvert.getFax()
      };
    }
    return undefined;
  },

  convertWarehouseFromGRPC(warehouseToConvert) {
    if (warehouseToConvert) {
      return {
        id: warehouseToConvert.getId(),
        uuid: warehouseToConvert.getUuid(),
        name: warehouseToConvert.getName(),
        description: warehouseToConvert.getDescription()
      };
    }
    return undefined;
  },

  convertUnitOfMeasureFromGRPC(unitOfMeasureToConvert) {
    if (unitOfMeasureToConvert) {
      return {
        uuid: unitOfMeasureToConvert.getUuid(),
        id: unitOfMeasureToConvert.getId(),
        code: unitOfMeasureToConvert.getCode(),
        symbol: unitOfMeasureToConvert.getSymbol(),
        name: unitOfMeasureToConvert.getName(),
        description: unitOfMeasureToConvert.getDescription(),
        stdPrecision: unitOfMeasureToConvert.getStdprecision(),
        costingPrecision: unitOfMeasureToConvert.getCostingprecision()
      };
    }
    return undefined;
  },

  convertChargeFromGRPC(chargeToConvert) {
    if (chargeToConvert) {
      return {
        uuid: chargeToConvert.getUuid(),
        id: chargeToConvert.getId(),
        name: chargeToConvert.getName(),
        description: chargeToConvert.getDescription()
      };
    }
    return undefined;
  },

  // Business Partner
  convertBusinessPartnerFromGRPC(businessPartnerToConvert) {
    if (businessPartnerToConvert) {
      return {
        uuid: businessPartnerToConvert.getUuid(),
        id: businessPartnerToConvert.getId(),
        value: businessPartnerToConvert.getValue(),
        taxId: businessPartnerToConvert.getTaxid(),
        duns: businessPartnerToConvert.getDuns(),
        naics: businessPartnerToConvert.getNaics(),
        name: businessPartnerToConvert.getName(),
        lastName: businessPartnerToConvert.getLastname(),
        description: businessPartnerToConvert.getDescription()
      };
    }
    return undefined;
  },

  convertDocumentTypeFromGRPC(documentTypeToConvert) {
    if (documentTypeToConvert) {
      return {
        uuid: documentTypeToConvert.getUuid(),
        id: documentTypeToConvert.getId(),
        name: documentTypeToConvert.getName(),
        printName: documentTypeToConvert.getPrintname(),
        description: documentTypeToConvert.getDescription()
      };
    }
    return undefined;
  },

  convertSalesRepresentativeFromGRPC(salesRepresentativeToConvert) {
    if (salesRepresentativeToConvert) {
      return {
        uuid: salesRepresentativeToConvert.getUuid(),
        id: salesRepresentativeToConvert.getId(),
        name: salesRepresentativeToConvert.getName(),
        description: salesRepresentativeToConvert.getDescription()
      };
    }
    return undefined;
  },

  convertProductFromGRPC(productToConvert) {
    if (productToConvert) {
      const { getDecimalFromGRPC } = require('@adempiere/grpc-core-client/src/convertBaseDataType.js');

      return {
        uuid: productToConvert.getUuid(),
        id: productToConvert.getId(),
        value: productToConvert.getValue(),
        name: productToConvert.getName(),
        help: productToConvert.getHelp(),
        documentNote: productToConvert.getDocumentnote(),
        uomName: productToConvert.getUomname(),
        productType: productToConvert.getProducttype(),
        isStocked: productToConvert.getIsstocked(),
        isDropShip: productToConvert.getIsdropship(),
        isPurchased: productToConvert.getIspurchased(),
        isSold: productToConvert.getIssold(),
        imageURL: productToConvert.getImageurl(),
        productCategoryName: productToConvert.getProductcategoryname(),
        productGroupName: productToConvert.getProductgroupname(),
        productClassName: productToConvert.getProductclassname(),
        productClassificationName: productToConvert.getProductclassificationname(),
        weight: getDecimalFromGRPC(
          productToConvert.getWeight()
        ),
        volume: getDecimalFromGRPC(
          productToConvert.getVolume()
        ),
        upc: productToConvert.getUpc(),
        sku: productToConvert.getSku(),
        shelfWidth: productToConvert.getShelfwidth(),
        shelfHeight: getDecimalFromGRPC(
          productToConvert.getShelfheight()
        ),
        shelfDepth: productToConvert.getShelfdepth(),
        unitsPerPack: productToConvert.getUnitsperpack(),
        unitsPerPallet: getDecimalFromGRPC(
          productToConvert.getUnitsperpallet()
        ),
        guaranteeDays: productToConvert.getGuaranteedays(),
        descriptionURL: productToConvert.getDescriptionurl(),
        versionNo: productToConvert.getVersionno(),
        taxCategory: productToConvert.getTaxcategory(),
        description: productToConvert.getDescription()
      };
    }
    return undefined;
  },

  convertTaxRateFromGRPC(taxRateToConvert) {
    //  Tax rate
    if (taxRateToConvert) {
      const { getDecimalFromGRPC } = require('@adempiere/grpc-core-client/src/convertBaseDataType.js');

      return {
        name: taxRateToConvert.getName(),
        description: taxRateToConvert.getDescription(),
        taxIndicator: taxRateToConvert.getTaxindicator(),
        rate: getDecimalFromGRPC(
          taxRateToConvert.getRate()
        )
      };
    }
    return undefined;
  },

  convertProductPriceFromGRPC(productPriceToConvert) {
    if (productPriceToConvert) {
      const { getDecimalFromGRPC } = require('@adempiere/grpc-core-client/src/convertBaseDataType.js');

      return {
        currency: convertCoreFunctionality.convertCurrencyFromGRPC(
          productPriceToConvert.getCurrency()
        ),
        taxRate: convertCoreFunctionality.convertTaxRateFromGRPC(
          productPriceToConvert.getTaxrate()
        ),
        product: convertCoreFunctionality.convertProductFromGRPC(
          productPriceToConvert.getProduct()
        ),
        priceList: getDecimalFromGRPC(
          productPriceToConvert.getPricelist()
        ),
        priceStd: getDecimalFromGRPC(productPriceToConvert.getPricestd()),
        priceLimit: getDecimalFromGRPC(productPriceToConvert.getPricelimit()),
        priceListName: productPriceToConvert.getPricelistname(),
        isTaxIncluded: productPriceToConvert.getIstaxincluded(),
        validFrom: productPriceToConvert.getValidfrom(),
        pricePrecision: productPriceToConvert.getPriceprecision(),
        quantityOnHand: getDecimalFromGRPC(
          productPriceToConvert.getQuantityonhand()
        ),
        quantityReserved: getDecimalFromGRPC(
          productPriceToConvert.getQuantityreserved()
        ),
        quantityOrdered: getDecimalFromGRPC(
          productPriceToConvert.getQuantityordered()
        ),
        quantityAvailable: getDecimalFromGRPC(
          productPriceToConvert.getQuantityavailable()
        )
      };
    }
    return undefined;
  },

  convertLanguageFromGRPC(languageToConvert) {
    if (languageToConvert) {
      return {
        language: languageToConvert.getLanguage(),
        languageName: languageToConvert.getLanguagename(),
        languageISO: languageToConvert.getLanguageiso(),
        countryCode: languageToConvert.getCountrycode(),
        isBaseLanguage: languageToConvert.getIsbaselanguage(),
        isSystemLanguage: languageToConvert.getIssystemlanguage(),
        isDecimalPoint: languageToConvert.getIsdecimalpoint(),
        datePattern: languageToConvert.getDatepattern(),
        timePattern: languageToConvert.getTimepattern()
      };
    }
    return undefined;
  },

  convertPriceListFromGRPC(priceListToConvert) {
    if (priceListToConvert) {
      return {
        uuid: priceListToConvert.getUuid(),
        id: priceListToConvert.getId(),
        name: priceListToConvert.getName(),
        description: priceListToConvert.getDescription(),
        currency: convertCoreFunctionality.convertCountryFromGRPC(
          priceListToConvert.getCurrency()
        ),
        isDefault: priceListToConvert.getIsdefault(),
        isTaxIncluded: priceListToConvert.getIstaxincluded(),
        isEnforcePriceLimit: priceListToConvert.getIsenforcepricelimit(),
        isNetPrice: priceListToConvert.getIsnetprice(),
        pricePrecision: priceListToConvert.getPriceprecision()
      };
    }
    return undefined;
  },

  convertBankAccountFromGRPC(bankAccountToConvert) {
    if (bankAccountToConvert) {
      const { getDecimalFromGRPC } = require('@adempiere/grpc-core-client/src/convertBaseDataType.js');
      const { getBankAccount_BankAccountType } = require('./convertEnums.js');

      return {
        uuid: bankAccountToConvert.getUuid(),
        id: bankAccountToConvert.getId(),
        name: bankAccountToConvert.getName(),
        accountNo: bankAccountToConvert.getAccountno(),
        description: bankAccountToConvert.getDescription(),
        currency: convertCoreFunctionality.convertCurrencyFromGRPC(
          bankAccountToConvert.getCurrency()
        ),
        bban: bankAccountToConvert.getBban(),
        iban: bankAccountToConvert.getIban(),
        creditLimit: getDecimalFromGRPC(
          bankAccountToConvert.getCreditlimit()
        ),
        currentBalance: getDecimalFromGRPC(
          bankAccountToConvert.getCurrentbalance()
        ),
        isDefault: bankAccountToConvert.getIsdefault(),
        businessPartner: convertCoreFunctionality.convertBusinessPartnerFromGRPC(
          bankAccountToConvert.getBusinesspartner()
        ),
        bankAccountType: bankAccountToConvert.getBankaccounttype(),
        bankAccountTypeName: getBankAccount_BankAccountType({
          value: bankAccountToConvert.getBankaccounttype()
        })
      };
    }
    return undefined;
  }

};

module.exports = convertCoreFunctionality;
