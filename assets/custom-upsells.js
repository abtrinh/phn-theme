var new_cur = '$';
var sale = 1;

function changeTotalOnPage(){
  var c = $('.sub_price').length; //count for price on page
  if (c != 0) {
    $.getJSON('/cart.js?', function(cart) {
      var k = cart.items.length;
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

function setProductInfo(page_product,title_text,upsells,json_prods){
    $.getJSON('/products/'+page_product+'.json', function(page_product) {
      var link = '/products/'+page_product.product.handle;
      var name = page_product.product.title;
      var img_src = page_product.product.image.src;
      $('.up-img img').attr('src',img_src);
      $('.up-name').text(name);
      $('.up-title.title-insert').text(title_text);
      $('.main_product_href').attr('href',link);
    });

    // if (recc_prod == '1'){
    //   $('.up-reccuring-block').addClass('active');
    // }

  var k = upsells.length;
  if (k!=0){
    for (var i = 0; i < k; i++) {
      $.ajaxSetup({
        async: false
      });
      $.getJSON('/products/'+upsells[i]+'.json', function(upsells_info) {

        var link = upsells_info.product.handle;
        var name = upsells_info.product.title;
        var img_src = upsells_info.product.image.src;
        var prod_price = upsells_info.product.variants[0].price;
        var prod_price_sale = parseFloat(prod_price*sale).toFixed(2);
        var prod_id = upsells_info.product.variants[0].id;
        var output = '<div class="up-proditem">';
        var p_in_cart = false;
        output = output + '<div class="up-proditem-img"><a href="/products/'+link+'"><img src="'+img_src+'" class="'+link+'"></a></div>';
        output = output + '<div class="up-proditem-info"><a href="/products/'+link+'"><div class="up-proditem-name">'+name+'</div></a>';
        output = output + '<div class="up-proditem-price"><span class="new_up_price">$'+prod_price_sale+'</span></div>';

        
//         output = output + '<div class="up-proditem-price"><del><span class="up_price">$'+prod_price+'</span></del> <span style="color: red;">SALE: </span><span class="new_up_price">$'+prod_price_sale+'</span></div>';
//         output = output + '<div class="up-proditem-saletext">(25% OFF W/ CODE)</div>';
        output = output + '<div class="up-proditem-button"><button class="up-add-btn" type="button" data-id="'+prod_id+'">Add to cart</button></div></div></div>';


        $.getJSON('/cart.js?', function(cart) {
          //console.log(cart);
          var k = cart.items.length;
          for (var i = 0; i < k; i++) {
            if (cart.items[i].variant_id == prod_id){
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


function addFormItem() {
  $.ajax({
    type: 'POST', 
    url: '/cart/add.js',
    dataType: 'json', 
    data: $('form.product_form').serialize(),

    success: function(data) {
              console.log('yes');
              window.location.href  =  '/cart';
            }
  });
}

function addFormItemReccuring() {
  $.ajax({
    type: 'POST', 
    url: '/cart/add.js',
    dataType: 'json', 
    data: $('form.reccuring_form').serialize()
  });
}


function addItem(id,qty) {
  return $.ajax({
    type: 'POST', 
    url: '/cart/add.js',
    dataType: 'json', 
    data: {'id':id, 'quantity' : qty},
	async: false
  }).done(function( response ) {
    			cartUpdate()
              return response;
  });
}


$(document).on("click", ".up-proditem-button .up-rec-add-btn", function(event){
  $.post('/cart/update.js', {updates: {7944630239274: 0}});
  $('.up-reccuring-block').addClass('added');
  $('.bold-ro__subscribe-radio-btn').click();
  setTimeout(function(){
    addFormItemReccuring();
  }, 1000);
  
});

$(document).on("click", ".up-rec-no-btn a", function(event){
  $('.up-reccuring-block').addClass('added');
});

$(document).on("click", ".upsell_close", function(event){
  $('.upsell_overlay').hide();
  location.reload();
  // window.location.href  =  '/cart';
});

$(document).on("click", ".up-proditem-button .up-add-btn", function(event){
  
  var id = $(this).data('id');
  
  attr_resp=addItem(id,1);
  
  if(attr_resp.status===200){
    
    $(this).closest('.up-proditem').animate({
      width: "toggle"
    }).remove();

    setTimeout(function(){
      changeTotalOnPage();
    }, 500);
    
    var qty = $('.up-products-block .up-proditem').length;
    
    if(qty!=0){
      
      if (qty == 2) {
        $('.up-proditem').addClass('row-view');
      }
      
    }else{
      
      $('.upsell_overlay').hide();
      location.reload();
      // window.location.href  =  '/cart';
      
    }
  }
  
});

window.mobilecheck = function() {
  var check = false;
  (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
  //return check;
  return true;
};

function open_upsell(upsell_array){
//   	console.log(upsell_array);
    let cart=$.getJSON('/cart.js?', function(cart) {
        return cart;
    })
	
	$('html,body').animate({
            scrollTop: 0
          })
    
    $('.upsell_overlay').css('display','flex')
    $('body').addClass('modal_open')

}