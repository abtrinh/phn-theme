var new_cur = '$';
var sale = 1;

function changeTotalOnPage(){
  var c = $('.sub_price').length; 
  if (c != 0) {
    $.getJSON('/cart.js?', function(cart) {
      var qty = cart.item_count;
      var total = cart.total_price;
      total = (total/100).toFixed(2);
      var total_sale = parseFloat(total*sale).toFixed(2);
      $('.sub_price').html(new_cur+''+total_sale);
      $('.cart-count, .up-cart-count, .item--cart .quantity, .onyx-mobile-menu__cart-qty .quantity .header__menu_count').text(qty);
    });
  }
}

$(document).ready(function(){
  changeTotalOnPage();
});

function setProductInfo(page_product, title_text, upsells, json_prods){
    $.getJSON('/products/'+page_product+'.json', function(data) {
      var link = '/products/'+data.product.handle;
      var name = data.product.title;
      var img_src = data.product.image.src;
      $('.up-img img').attr('src',img_src);
      $('.up-name').text(name);
      $('.up-title.title-insert').text(title_text);
      $('.main_product_href').attr('href',link);
    });

  var k = upsells.length;
  if (k != 0){
    // Clear the container once before adding new items to prevent doubling
    $('.up-products-block').empty();

    for (var i = 0; i < k; i++) {
      $.ajaxSetup({ async: false });
      
      $.getJSON('/products/'+upsells[i]+'.json', function(upsells_info) {
        var link = upsells_info.product.handle;
        var name = upsells_info.product.title;
        var img_src = upsells_info.product.image.src;
        var prod_price = upsells_info.product.variants[0].price;
        var prod_price_sale = parseFloat(prod_price*sale).toFixed(2);
        var prod_id = upsells_info.product.variants[0].id;
        
        var output = '<div class="up-proditem">';
        output += '<div class="up-proditem-img"><a href="/products/'+link+'"><img src="'+img_src+'" class="'+link+'"></a></div>';
        output += '<div class="up-proditem-info"><a href="/products/'+link+'"><div class="up-proditem-name">'+name+'</div></a>';
        output += '<div class="up-proditem-price"><span class="new_up_price">$'+prod_price_sale+'</span></div>';
        output += '<div class="up-proditem-button"><button class="up-add-btn" type="button" data-id="'+prod_id+'">Add to cart</button></div></div></div>';

        $.getJSON('/cart.js?', function(cart) {
          var p_in_cart = false;
          for (var j = 0; j < cart.items.length; j++) {
            if (cart.items[j].variant_id == prod_id){
              p_in_cart = true;
              break;
            } 
          }
          if (!p_in_cart){
            $('.up-products-block').append(output);
          }
        });
      });
    }
  }
}

function addItem(id, qty) {
  return $.ajax({
    type: 'POST', 
    url: '/cart/add.js',
    dataType: 'json', 
    data: {'id':id, 'quantity' : qty},
    async: false
  }).done(function(response) {
      if(typeof cartUpdate === 'function') cartUpdate();
      return response;
  });
}

$(document).on("click", ".upsell_close", function(event){
  $('.upsell_overlay').hide();
  location.reload();
});

$(document).on("click", ".up-proditem-button .up-add-btn", function(event){
  var id = $(this).data('id');
  var attr_resp = addItem(id, 1);
  
  if(attr_resp.status === 200){
    $(this).closest('.up-proditem').animate({ width: "toggle" }).remove();
    setTimeout(function(){ changeTotalOnPage(); }, 500);
    
    var remaining = $('.up-products-block .up-proditem').length;
    if(remaining == 0){
      $('.upsell_overlay').hide();
      location.reload();
    }
  }
});

function open_upsell(upsell_array){
  $('html,body').animate({ scrollTop: 0 });
  $('.upsell_overlay').css('display','flex');
  $('body').addClass('modal_open');
}