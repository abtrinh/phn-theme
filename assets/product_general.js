document.addEventListener("DOMContentLoaded", function () {
  // Handle Omnisend review redirect logic
  const ref = document.referrer;
  if (ref.includes("postProductReview=true")) {
    if (typeof waitForElement === "function") {
      waitForElement('.omnisend-main-review-block', function () {
        $('#omnisend-main-review-block-leave-review-button').click();
      });
    }
  }

  /**
   * window.setProductInfo
   * This function is now a "lightweight" trigger. 
   * The heavy lifting is handled by Liquid for PageSpeed.
   */
  window.setProductInfo = function(page_product, title_text, upsell_array) {
    // 1. We no longer loop or fetch here because Liquid handled it.
    // 2. We just ensure the title of the popup is correct.
    $('.upsell_title').text(title_text);
    
    console.log("Upsell popup initialized via Liquid rendering.");
  };

  // 3. Handle the "Add to Cart" click for the upsell items
  $(document).on('click', '.upsell_add_btn', function(e) {
    e.preventDefault();
    var variantId = $(this).data('variant-id');
    
    if (variantId) {
      $.ajax({
        type: 'POST',
        url: '/cart/add.js',
        data: {
          quantity: 1,
          id: variantId
        },
        dataType: 'json',
        success: function() {
          window.location.href = '/cart'; // Redirect to cart after adding
        },
        error: function(err) {
          console.error("Error adding upsell to cart", err);
        }
      });
    }
  });
});