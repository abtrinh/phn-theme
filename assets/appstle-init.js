(function (window, k) {
    if (!window.AppstleIncluded && (!urlIsProductPage() || 'V1' === 'V1')) {
      window.AppstleIncluded = true;
      appstleLoadScript = function (src, callback) {
        var script = document.createElement("script");
        script.charset = "utf-8";
            script.async = true;
        script.src = src;
        script.onload = script.onreadystatechange = function () {
          if (!script.readyState || /loaded|complete/.test(script.readyState)) {
            script.onload = script.onreadystatechange = null;
            script = k;
            callback && callback();
          }
        };
            document.getElementsByTagName("head")[0].appendChild(script)
      };


      appstleLoadScript("https://cdn.shopify.com/s/files/1/0555/4300/5364/t/1/assets/appstle-subscription.js?v=1686531705");


      window.RS = Window.RS || {};
      RS.Config = {
        "selectors": {
            "payment_button_selectors": "form[action$='/cart/add'] .shopify-payment-button",
            "subscriptionLinkSelector": ".customer.account div:nth-child(2) div:nth-child(2)",
            "atcButtonPlacement": "BEFORE",
            "subscriptionLinkPlacement": "BEFORE",
            "cartRowSelector": "",
            "cartLineItemSelector": "",
            "cartLineItemPerQuantityPriceSelector": "",
            "cartLineItemTotalPriceSelector": "",
            "cartLineItemSellingPlanNameSelector": "",
            "cartSubTotalSelector" : "",
            "cartLineItemPriceSelector": "",
        },
        "enableCartWidgetFeature": "false",
        "useUrlWithCustomerId": "false",
        "atcButtonSelector": ".product__info__addToCart--button",
        "moneyFormat": "{% raw %}${{amount}}{% endraw %}",
        "oneTimePurchaseText": "One Time Purchase",
        "shop": "phemp.myshopify.com",
        "deliveryText": "delivery",
        "purchaseOptionsText": "Purchase Options",
        "manageSubscriptionButtonText": "Manage Subscription",
        "subscriptionOptionText": "Subscribe and save",
        "sellingPlanSelectTitle": "DELIVERY FREQUENCY",
        "subscriptionPriceDisplayText": "",
        "tooltipTitle": "Subscription detail",
        "showTooltipOnClick": "false",
        "tooltipDesctiption": "<strong>Have complete control of your subscriptions<\/strong><br\/><br\/>Skip, reschedule, edit, cancel deliveries anytime matching your needs.",
        "tooltipDescriptionOnPrepaidPlan": "<b>Prepaid Plan Details<\/b><\/br> Total price: {{totalPrice}} ( Price for every delivery: {{pricePerDelivery}})",
        "tooltipDescriptionOnMultipleDiscount": "<b>Discount Details<\/b><\/br> Initial discount is {{discountOne}} and then {{discountTwo}}",
        "tooltipDescriptionCustomization": "{{{defaultTooltipDescription}}} <\/br>  {{{prepaidDetails}}} <\/br> {{{discountDetails}}}",
        "orderStatusManageSubscriptionTitle": "Subscription",
        "orderStatusManageSubscriptionDescription": "Continue to your account to view and manage your subscriptions. Please use the same email address that you used to buy the subscription.",
        "orderStatusManageSubscriptionButtonText": "Manage your subscription",
        "subscriptionOptionSelectedByDefault" : false,
        "totalPricePerDeliveryText" : "{{prepaidPerDeliveryPrice}}\/delivery",
        "memberOnlySellingPlansJson": {},
        "nonMemberOnlySellingPlansJson": {},
        "sellingPlansJson": [{"frequencyCount":30,"frequencyInterval":"DAY","billingFrequencyCount":30,"billingFrequencyInterval":"DAY","frequencyName":"Ships Every 30 Days. No Contracts, Cancel Anytime.","discountOffer":0.0,"discountOffer2":3.02,"afterCycle1":0,"afterCycle2":1,"discountType":"PERCENTAGE","discountType2":"FIXED","discountEnabled":true,"discountEnabled2":true,"discountEnabledMasked":true,"discountEnabled2Masked":true,"id":"gid://shopify/SellingPlan/558170292","frequencyType":"ON_PURCHASE_DAY","specificDayEnabled":false,"cutOff":0,"prepaidFlag":"false","idNew":"gid://shopify/SellingPlan/558170292","planType":"PAY_AS_YOU_GO","deliveryPolicyPreAnchorBehavior":"ASAP","freeTrialEnabled":false,"formFieldJson":"null","groupName":"Pain Relief Patches 15 ct. (120 mg)","appstleCycles":[]},{"frequencyCount":1,"frequencyInterval":"DAY","billingFrequencyCount":1,"billingFrequencyInterval":"DAY","frequencyName":"Ships Every 30 Days. No Contracts, Cancel Anytime.","discountOffer":0.0,"discountOffer2":5.8,"afterCycle1":0,"afterCycle2":1,"discountType":"PERCENTAGE","discountType2":"FIXED","discountEnabled":true,"discountEnabled2":true,"discountEnabledMasked":true,"discountEnabled2Masked":true,"id":"gid://shopify/SellingPlan/651460788","frequencyType":"ON_PURCHASE_DAY","specificDayEnabled":false,"cutOff":0,"prepaidFlag":"false","idNew":"gid://shopify/SellingPlan/651460788","planType":"PAY_AS_YOU_GO","deliveryPolicyPreAnchorBehavior":"ASAP","freeTrialEnabled":false,"formFieldJson":"null","groupName":"Pain Relief Patches 30 ct. (240 mg)","appstleCycles":[]},{"frequencyCount":30,"frequencyInterval":"DAY","billingFrequencyCount":30,"billingFrequencyInterval":"DAY","frequencyName":"Ships Every 30 Days. No Contracts, Cancel Anytime.","discountOffer":0.0,"discountOffer2":10.8,"afterCycle1":0,"afterCycle2":1,"discountType":"PERCENTAGE","discountType2":"FIXED","discountEnabled":true,"discountEnabled2":true,"discountEnabledMasked":true,"discountEnabled2Masked":true,"id":"gid://shopify/SellingPlan/651493556","frequencyType":"ON_PURCHASE_DAY","specificDayEnabled":false,"maxCycles":100,"minCycles":1,"cutOff":0,"prepaidFlag":"false","idNew":"gid://shopify/SellingPlan/651493556","planType":"PAY_AS_YOU_GO","deliveryPolicyPreAnchorBehavior":"ASAP","freeTrialEnabled":false,"formFieldJson":"null","groupName":"Pain Relief Patches 60 ct. (480 mg)","appstleCycles":[]},{"frequencyCount":30,"frequencyInterval":"DAY","billingFrequencyCount":30,"billingFrequencyInterval":"DAY","frequencyName":"Ships Every 30 Days. No Contracts, Cancel Anytime.","discountOffer":0.0,"discountOffer2":8.57,"afterCycle1":0,"afterCycle2":1,"discountType":"PERCENTAGE","discountType2":"FIXED","discountEnabled":true,"discountEnabled2":true,"discountEnabledMasked":true,"discountEnabled2Masked":true,"id":"gid://shopify/SellingPlan/651559092","frequencyType":"ON_PURCHASE_DAY","specificDayEnabled":false,"cutOff":0,"prepaidFlag":"false","idNew":"gid://shopify/SellingPlan/651559092","planType":"PAY_AS_YOU_GO","deliveryPolicyPreAnchorBehavior":"ASAP","freeTrialEnabled":false,"formFieldJson":"null","groupName":"Pain Relief Cream 1 Jar (1,000 mg)","appstleCycles":[]},{"frequencyCount":30,"frequencyInterval":"DAY","billingFrequencyCount":30,"billingFrequencyInterval":"DAY","frequencyName":"Ships Every 30 Days. No Contracts, Cancel Anytime.","discountOffer":0.0,"discountOffer2":8.4,"afterCycle1":0,"afterCycle2":1,"discountType":"PERCENTAGE","discountType2":"FIXED","discountEnabled":true,"discountEnabled2":true,"discountEnabledMasked":true,"discountEnabled2Masked":true,"id":"gid://shopify/SellingPlan/792690868","frequencyType":"ON_PURCHASE_DAY","specificDayEnabled":false,"cutOff":0,"prepaidFlag":"false","idNew":"gid://shopify/SellingPlan/792690868","planType":"PAY_AS_YOU_GO","deliveryPolicyPreAnchorBehavior":"ASAP","freeTrialEnabled":false,"formFieldJson":"null","groupName":"GOLD Pain Relief Patches 18 ct. (432 mg) ","appstleCycles":[]},{"frequencyCount":30,"frequencyInterval":"DAY","billingFrequencyCount":30,"billingFrequencyInterval":"DAY","frequencyName":"Ships Every 30 Days. No Contracts, Cancel Anytime.","discountOffer":0.0,"discountOffer2":15.8,"afterCycle1":0,"afterCycle2":1,"discountType":"PERCENTAGE","discountType2":"FIXED","discountEnabled":true,"discountEnabled2":true,"discountEnabledMasked":true,"discountEnabled2Masked":true,"id":"gid://shopify/SellingPlan/792723636","frequencyType":"ON_PURCHASE_DAY","specificDayEnabled":false,"cutOff":0,"prepaidFlag":"false","idNew":"gid://shopify/SellingPlan/792723636","planType":"PAY_AS_YOU_GO","deliveryPolicyPreAnchorBehavior":"ASAP","freeTrialEnabled":false,"formFieldJson":"null","groupName":"GOLD Pain Relief Patches 36 ct. (864 mg)","appstleCycles":[]},{"frequencyCount":30,"frequencyInterval":"DAY","billingFrequencyCount":30,"billingFrequencyInterval":"DAY","frequencyName":"Ships Every 30 Days. No Contracts, Cancel Anytime.","discountOffer":0.0,"discountOffer2":5.0,"afterCycle1":0,"afterCycle2":1,"discountType":"PERCENTAGE","discountType2":"FIXED","discountEnabled":true,"discountEnabled2":true,"discountEnabledMasked":true,"discountEnabled2Masked":true,"id":"gid://shopify/SellingPlan/921370804","frequencyType":"ON_PURCHASE_DAY","specificDayEnabled":false,"cutOff":0,"prepaidFlag":"false","idNew":"gid://shopify/SellingPlan/921370804","planType":"PAY_AS_YOU_GO","deliveryPolicyPreAnchorBehavior":"ASAP","freeTrialEnabled":false,"formFieldJson":"null","groupName":"CALM + RELAX Nighttime 1 Btl. (30 Capsules)","appstleCycles":[]},{"frequencyCount":30,"frequencyInterval":"DAY","billingFrequencyCount":30,"billingFrequencyInterval":"DAY","frequencyName":"Ships Every 30 Days. No Contracts, Cancel Anytime.","discountOffer":0.0,"discountOffer2":2.0,"afterCycle1":0,"afterCycle2":1,"discountType":"PERCENTAGE","discountType2":"PERCENTAGE","discountEnabled":true,"discountEnabled2":true,"discountEnabledMasked":true,"discountEnabled2Masked":true,"id":"gid://shopify/SellingPlan/970883252","frequencyType":"ON_PURCHASE_DAY","specificDayEnabled":false,"cutOff":0,"prepaidFlag":"false","idNew":"gid://shopify/SellingPlan/970883252","planType":"PAY_AS_YOU_GO","deliveryPolicyPreAnchorBehavior":"ASAP","freeTrialEnabled":false,"formFieldJson":"null","frequencySequence":0,"groupName":"Zoomie Sticks 10 count (200mg)","appstleCycles":[]},{"frequencyCount":30,"frequencyInterval":"DAY","billingFrequencyCount":30,"billingFrequencyInterval":"DAY","frequencyName":"Ships Every 30 Days. No Contracts, Cancel Anytime.","discountOffer":0.0,"discountOffer2":3.99,"afterCycle1":0,"afterCycle2":1,"discountType":"PERCENTAGE","discountType2":"PERCENTAGE","discountEnabled":true,"discountEnabled2":true,"discountEnabledMasked":true,"discountEnabled2Masked":true,"id":"gid://shopify/SellingPlan/970948788","frequencyType":"ON_PURCHASE_DAY","specificDayEnabled":false,"cutOff":0,"prepaidFlag":"false","idNew":"gid://shopify/SellingPlan/970948788","planType":"PAY_AS_YOU_GO","deliveryPolicyPreAnchorBehavior":"ASAP","freeTrialEnabled":false,"formFieldJson":"null","frequencySequence":0,"groupName":"Zoomie Sticks 10 count (400MG)","appstleCycles":[]}],
        "widgetEnabled": true,
        "showTooltip" : true,
        "sortByDefaultSequence": false,
        "showSubOptionBeforeOneTime": false,
        "showStaticTooltip": false,
        "showAppstleLink": false,
        "sellingPlanTitleText" : "{{sellingPlanName}} ({{sellingPlanPrice}}\/delivery)",
        "oneTimePriceText" : "{{price}}",
        "selectedPayAsYouGoSellingPlanPriceText" : "{{price}}",
        "selectedPrepaidSellingPlanPriceText" : "{{pricePerDelivery}}",
        "selectedDiscountFormat" : "SAVE {{selectedDiscountPercentage}}",
        "manageSubscriptionBtnFormat" : "<a href='apps\/subscriptions' class='appstle_manageSubBtn' ><button class='btn' style='padding: 2px 20px'>Manage Subscription<\/button><a><br><br>",
        "manageSubscriptionUrl" : "apps\/subscriptions",
        "appstlePlanId": 163,
        "showCheckoutSubscriptionBtn": true,
        "disableLoadingJquery": false,
        "widgetEnabledOnSoldVariant": "false",
        "switchRadioButtonWidget": false,
        "appstlePlanName": "BUSINESS",
        "appstlePlanFeatures": {
    "accessAdvancedCustomerPortalSettings": false,
    "accessAdvanceSubscriptionPlanOptions": true,
    "accessAppstleMenu": false,
    "accessBuildABox": true,
    "accessBundling": true,
    "accessDiscountOnCancellationAttempt": true,
    "accessKlaviyoContactSync": true,
    "accessManualSubscriptionCreation": true,
    "accessOneTimeProductUpsells": true,
    "accessQuickCheckout": false,
    "accessResendEmail": true,
    "accessSplitContract": true,
    "accessSubscriberLoyaltyFeatures": true,
    "accessSubscriptionActivityLogs": true,
    "accessWidgetDesignOptions": true,
    "analytics": true,
    "enableAdvancedSellingPlans": true,
    "enableAutomation": true,
    "enableAutoSync": false,
    "enableBundling": true,
    "enableCancellationManagement": true,
    "enableCartWidget": true,
    "enableCustomEmailDomain": true,
    "enableCustomEmailHtml": true,
    "enableCustomerPortalSettings": true,
    "enableDunningManagement": true,
    "enableExternalApi": false,
    "enableIntegrations": true,
    "enableProductSwapAutomation": false,
    "enableQuickActions": false,
    "enableShippingProfiles": true,
    "enableSmsAlert": false,
    "enableSubscriptionManagement": true,
    "enableSummaryReports": true,
    "enableWidgetPlacement": true,
    "subscriptionOrderAmount": 30000,
    "webhookAccess": false
},
        "formMappingAttributeName": "",
        "formMappingAttributeSelector": "",
        "quickViewModalPollingSelector": "",
        "scriptLoadDelay": "0",
        "formatMoneyOverride": "false",
        "appstle_app_proxy_path_prefix": "apps\/subscriptions",
        "updatePriceOnQuantityChange": "",
        "widgetParentSelector": "",
        "quantitySelector": "",
        "enableAddJSInterceptor": "false",
        "reBuyEnabled": "false",
        "loyaltyDetailsLabelText": "",
        "loyaltyPerkDescriptionText": "",
        "widgetTemplateHtml": ``,
        "bundle": {},
        "labels": "{\"appstle.subscription.wg.yearsFrequencyTextV2\":\"Years\",\"appstle.subscription.wg.weekFrequencyTextV2\":\"Week\",\"appstle.subscription.wg.noSubscriptionLabelTextV2\":\"No Subscription\",\"appstle.subscription.wg.cancelAnytimeLabelTextV2\":\"Cancel Anytime\",\"appstle.subscription.wg.oneTimePurchaseTextV2\":\"One Time Purchase\",\"appstle.subscription.wg.loyaltyPerkDescriptionTextV2\":\"{{#isDiscountTypeFreeProduct}}<div style='display: flex;'><div style='height: 60px; width: 60px; flex-shrink: 0; margin-right: 10px;'><img style='width: 100%' src={{{featured_image}}}><\/img><\/div><div>After {{{billingCycleBlock}}} orders,<span style='color: #ffc000;font-weight: 700;';> get a FREE {{freeProductName}} <\/span><\/div><div>{{\/isDiscountTypeFreeProduct}}{{#isDiscountTypePercentage}}After <span class='appstle-loyalty-billing-cycle'><span class='appstle-loyalty-billing-cycle-count'>{{{billingCycleBlock}}}<\/span> order<\/span>, <span class='appstle-loyalty-discount'>get <span style='color: #ffc000;font-weight: 700;';>{{{discount}}}% OFF your entire order<\/span><\/span>.{{\/isDiscountTypePercentage}}{{#isDiscountTypeShipping}}After <span class='appstle-loyalty-billing-cycle'><span class='appstle-loyalty-billing-cycle-count'>{{{billingCycleBlock}}}<\/span> order<\/span>, <span class='appstle-loyalty-discount'>get <span style='color: #ffc000;font-weight: 700;';>shipping at {{{formatDiscountedPrice}}}<\/span><\/span>.{{\/isDiscountTypeShipping}}{{#isDiscountTypeFixed}}After <span class='appstle-loyalty-billing-cycle'><span class='appstle-loyalty-billing-cycle-count'>{{{billingCycleBlock}}}<\/span> order<\/span>, <span class='appstle-loyalty-discount'>get <span style='color: #ffc000;font-weight: 700;';>{{{formatDiscountedPrice}}} OFF your entire order<\/span><\/span>.{{\/isDiscountTypeFixed}}\",\"appstle.subscription.wg.unsubscribeFrequencyTextV2\":\"unsubscribe\",\"appstle.subscription.wg.weeksFrequencyTextV2\":\"Weeks\",\"appstle.subscription.wg.weeklyLabelTextV2\":\"Weekly\",\"appstle.subscription.wg.oneTimeFrequencyTextV2\":\"One Time\",\"appstle.subscription.wg.dayFrequencyTextV2\":\"day\",\"appstle.subscription.wg.allowFulfilmentCountViaPropertiesV2\":\"true\",\"appstle.subscription.wg.monthsFrequencyTextV2\":\"Months\",\"appstle.subscription.wg.subscribeAndSaveInitalV2\":\"Subscribe & save\",\"appstle.subscription.wg.deliveryEveryFrequencyTextV2\":\"Delivery Every\",\"appstle.subscription.wg.offFrequencyTextV2\":\"Off\",\"appstle.subscription.wg.daysFrequencyTextV2\":\"Days\",\"appstle.subscription.wg.yearFrequencyTextV2\":\"Year\",\"appstle.subscription.wg.monthlyLabelTextV2\":\"Monthly\",\"appstle.subscription.wg.prepayLabelTextV2\":\"Prepay\",\"appstle.subscription.wg.subscribeAndSaveSuccessV2\":\"Subscribe success\",\"appstle.subscription.wg.monthFrequencyTextV2\":\"Month\",\"appstle.subscription.wg.selectDeliverOptionV2\":\"select deliver option\",\"appstle.subscription.wg.yearlyLabelTextV2\":\"Yearly\"}",
        "css": {
            "appstle_subscription_widget": {
                "margin-top": "" ,
                "margin-bottom": "",
            },

            "appstle_subscription_wrapper": {
                "border-width": "",
                "border-color": "",
            },

            "appstle_circle": {
                "border-color": "",
            },

            "appstle_dot": {
                "background-color": "",
            },

            "appstle_select": {
                "padding-top": "",
                "padding-bottom": "",
                "padding-left": "",
                "padding-right": "",
                "border-width": "",
                "border-style": "",
                "border-color": "",
                "border-radius": "",
            },

            "tooltip_subscription_svg": {
                "fill": "",
            },

            "appstle_tooltip": {
                "color": "",
                "background-color": "",
            },

            "appstle_tooltip_border_top_color": {
                "border-top-color": "",
            },

            "appstle_subscription_final_price": {
                "color": "",
            },
            "appstle_widget_text_color": {
                "color": "",
            },
            "appstle_selected_background": {
                "background": "transparent",
            },
            "customCSS": "",
            "elementCSS": "[]",
            "customerPortalCss": "",
            "priceSelector": ".price__regular .price-item.price-item--regular",
            "landingPagePriceSelector": "",
            "quickViewClickSelector": "",
            "badgeTop": "",
            "pricePlacement": "BEFORE"
        }
      };

    }

    function urlIsProductPage() {
    // return null != decodeURIComponent(window.location.pathname).match(/\/products\/(([a-zA-Z0-9]|[\-\.\_\~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[\ud83c\ud83d\ud83e][\ud000-\udfff]){1,})\/?/)
    return decodeURIComponent(window.location.pathname).includes('/products/');
    }
  }
)(window);

