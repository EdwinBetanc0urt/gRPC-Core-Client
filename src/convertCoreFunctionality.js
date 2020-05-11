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
        currency: convertCoreFuncionality.convertCurrencyFromGRPC(
          countryToConvert.getCurrency()
        )
      };
    }
    return {
      id: undefined,
      uuid: undefined,
      countryCode: undefined,
      name: undefined,
      description: undefined,
      hasRegion: undefined,
      regionName: undefined,
      displaySequence: undefined,
      isAddressLinesReverse: undefined,
      captureSequence: undefined,
      displaySequenceLocal: undefined,
      isAddressLinesLocalReverse: undefined,
      expressionPostal: undefined,
      hasPostalAdd: undefined,
      expressionPhone: undefined,
      mediaSize: undefined,
      expressionBankRoutingNo: undefined,
      expressionBankAccountNo: undefined,
      language: undefined,
      allowCitiesOutOfList: undefined,
      isPostcodeLookup: undefined,
      currency: undefined
    };
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
    return {
      currencyId: undefined,
      currencyUuid: undefined,
      iSOCode: undefined,
      curSymbol: undefined,
      description: undefined,
      stdPrecision: undefined,
      costingPrecision: undefined
    };
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
    return {
      id: undefined,
      uuid: undefined,
      name: undefined,
      description: undefined,
      isReadOnly: undefined,
      duns: undefined,
      taxId: undefined,
      phone: undefined,
      phone2: undefined,
      fax: undefined
    };
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
    return {
      id: undefined,
      uuid: undefined,
      name: undefined,
      description: undefined
    };
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
    return {
      uuid: undefined,
      id: undefined,
      code: undefined,
      symbol: undefined,
      name: undefined,
      description: undefined,
      stdPrecision: undefined,
      costingPrecision: undefined
    };
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
    return {
      uuid: undefined,
      id: undefined,
      name: undefined,
      description: undefined
    };
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
    return {
      uuid: undefined,
      id: undefined,
      value: undefined,
      taxId: undefined,
      duns: undefined,
      naics: undefined,
      name: undefined,
      lastName: undefined,
      description: undefined
    };
  },

  convertDocumentTypeFromGRPC(documentTypeToConvert) {
    if (documentTypeToConvert) {
      return {
        uuid: documentTypeToConvert.getUuid(),
        id: documentTypeToConvert.getId(),
        name: documentTypeToConvert.getName(),
        printerName: documentTypeToConvert.getPrintername(),
        description: documentTypeToConvert.getDescription()
      };
    }
    return {
      uuid: undefined,
      id: undefined,
      name: undefined,
      printerName: undefined,
      description: undefined
    };
  },

  convertSalesRepresentativeFromGRPC(salesRepresentativeToConvert) {
    if (salesRepresentativeToConvert) {
      return {
        uuid: salesRepresentativeToConvert.getUuid(),
        id: salesRepresentativeToConvert.getId(),
        name: salesRepresentativeToConvert.getName(),
        description: salesRepresentativeToConvert.getDescription()
      }
    }
    return {
      uuid: undefined,
      id: undefined,
      name: undefined,
      description: undefined
    }
  },

  convertProductFromGRPC(productToConvert) {
    if (productToConvert) {
      const { convertDecimalValue } = require('@adempiere/grpc-core-client/src/convertBaseDataType');

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
        weight: convertDecimalValue(
          productToConvert.getWeight()
        ),
        volume: convertDecimalValue(
          productToConvert.getVolume()
        ),
        upc: productToConvert.getUpc(),
        sku: productToConvert.getSku(),
        shelfWidth: productToConvert.getShelfwidth(),
        shelfHeight: convertDecimalValue(
          productToConvert.getShelfheight()
        ),
        shelfDepth: productToConvert.getShelfdepth(),
        unitsPerPack: productToConvert.getUnitsperpack(),
        unitsPerPallet: convertDecimalValue(
          productToConvert.getUnitsperpallet()
        ),
        guaranteeDays: productToConvert.getGuaranteedays(),
        descriptionURL: productToConvert.getDescriptionurl(),
        versionNo: productToConvert.getVersionno(),
        taxCategory: productToConvert.getTaxcategory(),
        description: productToConvert.getDescription()
      };
    }
    return {
      uuid: undefined,
      id: undefined,
      value: undefined,
      name: undefined,
      help: undefined,
      documentNote: undefined,
      uomName: undefined,
      productType: undefined,
      isStocked: undefined,
      isDropShip: undefined,
      isPurchased: undefined,
      isSold: undefined,
      imageURL: undefined,
      productCategoryName: undefined,
      productGroupName: undefined,
      productClassName: undefined,
      productClassificationName: undefined,
      weight: undefined,
      volume: undefined,
      upc: undefined,
      sku: undefined,
      shelfWidth: undefined,
      shelfHeight: undefined,
      shelfDepth: undefined,
      unitsPerPack: undefined,
      unitsPerPallet: undefined,
      guaranteeDays: undefined,
      descriptionURL: undefined,
      versionNo: undefined,
      taxCategory: undefined,
      description: undefined
    };
  },

  convertTaxRateFromGRPC(taxRateToConvert) {
    //  Tax rate
    if (taxRateToConvert) {
      const { convertDecimalValue } = require('@adempiere/grpc-core-client/src/convertBaseDataType');

      return {
        name: taxRateToConvert.getName(),
        description: taxRateToConvert.getDescription(),
        taxIndicator: taxRateToConvert.getTaxindicator(),
        rate: convertDecimalValue(
          taxRateToConvert.getRate()
        )
      };
    }
    return {
      name: undefined,
      description: undefined,
      taxIndicator: undefined,
      rate: undefined
    };
  },

  convertProductPriceFromGRPC(productPriceToConvert) {
    if (productPriceToConvert) {
      const { convertDecimalValue } = require('@adempiere/grpc-core-client/src/convertBaseDataType');

      return {
        currency: convertCoreFuncionality.convertCurrencyFromGRPC(
          productPriceToConvert.getCurrency()
        ),
        taxRate: convertCoreFuncionality.convertTaxRateFromGRPC(
          productPriceToConvert.getTaxrate()
        ),
        product: convertCoreFuncionality.convertProductFromGRPC(
          productPriceToConvert.getProduct()
        ),
        priceList: convertDecimalValue(
          productPriceToConvert.getPricelist()
        ),
        priceStd: convertDecimalValue(productPriceToConvert.getPricestd()),
        priceLimit: convertDecimalValue(productPriceToConvert.getPricelimit()),
        priceListName: productPriceToConvert.getPricelistname(),
        isTaxIncluded: productPriceToConvert.getIstaxincluded(),
        validFrom: productPriceToConvert.getValidfrom(),
        pricePrecision: productPriceToConvert.getPriceprecision(),
        quantityOnHand: convertDecimalValue(
          productPriceToConvert.getQuantityonhand()
        ),
        quantityReserved: convertDecimalValue(
          productPriceToConvert.getQuantityreserved()
        ),
        quantityOrdered: convertDecimalValue(
          productPriceToConvert.getQuantityordered()
        ),
        quantityAvailable: convertDecimalValue(
          productPriceToConvert.getQuantityavailable()
        )
      };
    }
    return {
      product: undefined,
      currency: undefined,
      taxRate: undefined,
      priceList: undefined,
      priceStd: undefined,
      priceLimit: undefined,
      priceListName: undefined,
      isTaxIncluded: undefined,
      validFrom: undefined,
      pricePrecision: undefined,
      quantityOnHand: undefined,
      quantityReserved: undefined,
      quantityOrdered: undefined,
      quantityAvailable: undefined
    };
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
    return {
      language: undefined,
      languageName: undefined,
      languageISO: undefined,
      countryCode: undefined,
      isBaseLanguage: undefined,
      isSystemLanguage: undefined,
      isDecimalPoint: undefined,
      datePattern: undefined,
      timePattern: undefined,
    };
  }
};

module.exports = convertCoreFunctionality;
