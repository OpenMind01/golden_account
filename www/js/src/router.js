// -------------------------------------------------------------------- - //

// Setup app routes.
App.config(function($routeProvider) {

  $routeProvider
    .when("/sign-in/:message?",{
      templateUrl: "tpl/views/sign_in.html",
      controller: "SignInController",
    })
    .when("/sign-up",{
      templateUrl: "tpl/views/sign_up.html",
      controller: "SignUpController"
    })
    .when("/sign-out",{
      template: "",
      controller: "SignOutController",
    })
    .when("/wallet/:module?/:identifier?",{
      templateUrl: "tpl/views/wallet/wallet.html",
      controller: "WalletController",
    })
    .when("/vault/:module?/:identifier?",{
      templateUrl: "tpl/views/vault/vault.html",
      controller: "VaultController",
    })
    .when("/investments/:module?/:identifier?",{
      templateUrl: "tpl/views/investments/investments.html",
      controller: "InvestmentsController",
    })
    .when("/summary/:module?",{
      templateUrl: "tpl/views/summary/summary.html",
      controller: "SummaryController",
    })
    .when("/verify/email/:token?", {
      templateUrl: "tpl/views/verify_email.html",
      controller: "VerifyEmailController",
    })
    .when("/verify/mobile",{
      templateUrl: "tpl/views/verify_mobile.html",
      controller: "VerifyMobileController",
    })
    .when("/basic-info",{
      templateUrl: "tpl/views/basic_info.html",
      controller: "BasicInfoController",
    })
    .when("/verify/id",{
      templateUrl: "tpl/views/verify_id.html",
      controller: "VerifyIdController",
    })
    .when("/thank-you-for-sigining-up-to-bitgold",{
      templateUrl: "tpl/views/sign_up_complete.html",
    })
    .when("/about-us",{
      templateUrl: "tpl/views/footer/about_us.html",
    })
    .when("/atm-locations",{
      templateUrl: "tpl/views/footer/atm_locations.html",
    })
    .when("/contact-us",{
      templateUrl: "tpl/views/footer/contact_us.html",
    })
    .when("/cookies",{
      templateUrl: "tpl/views/footer/cookies.html",
    })
    .when("/disclosures",{
      templateUrl: "tpl/views/footer/disclosures.html",
    })
    .when("/investors",{
      templateUrl: "tpl/views/footer/investors.html",
    })
    .when("/privacy-and-security",{
      templateUrl: "tpl/views/footer/privacy_security.html",
    })
    .when("/site-map",{
      templateUrl: "tpl/views/footer/site-map.html",
    })
    .when("/terms-of-service",{
      templateUrl: "tpl/views/footer/terms_of_service.html",
    })
    .when("/transparency",{
      templateUrl: "tpl/views/footer/transparency.html",
    })
    .when("/what-we-do",{
      templateUrl: "tpl/views/footer/what_we_do.html",
    })
    .when("/why-gold",{
      templateUrl: "tpl/views/footer/why_gold.html",
    })
    .otherwise({ redirectTo: "/sign-in" });

});

// -------------------------------------------------------------------- - //
