import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import {Observable, of} from 'rxjs';


@Injectable()
export class MockApiInterceptor implements HttpInterceptor {

  constructor() {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.url in httpApiResponse) {
      return of(new HttpResponse(httpApiResponse[req.url]));

    }
    return next.handle(req);
  }

}

const httpApiResponse = {
  '/api/catalog/product/': {
    'status': 200,
    'body': {
      'name': 'PAC Studio Coverage Liquid Foundation 04 12/35',
      'vendor': {
        'href': 'https://bhisma.cloud/wahtever',
        'name': 'PAC'
      },
      'description': 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
      'media': [
        {
          'href': 'https://www.youtube.com/watch?v=CC6XBWI65YQ',
          'type': 'video'
        },
        {
          'href': 'https://picsum.photos/328/328',
          'type': 'image'
        },
        {
          'href': 'https://picsum.photos/329/329',
          'type': 'image'
        }
      ],
      'price': {
        'current': 123800,
        'regular': 150000
      },
      'related': [
        {
          'href': 'https://bhisma.cloud/hahahahahhahahaa',
          'name': 'PAC Blush On-c-01',
          'vendor': {
            'href': 'https://bhisma.cloud/wahtever',
            'name': 'PAC'
          },
          'price': {
            'current': 123800,
          },
          'image': 'https://picsum.photos/160'
        },
        {
          'href': 'https://bhisma.cloud/hahahahahhahahaa',
          'name': 'PAC Blush On-c-01',
          'vendor': {
            'href': 'https://bhisma.cloud/wahtever',
            'name': 'PAC'
          },
          'price': {
            'current': 123800,
          },
          'image': 'https://picsum.photos/160'
        },
      ],
      'attributes': [
        {
          'name': 'Bahan-Bahan',
          'type': 'multiline_text',
          'value': 'Sodium Bicarbonate , Citric Acid , Corn Starch (Zea mays) , Synthetic Fluorphlogopite , Titanium Dioxide , Gardenia Extract (Gardenia jasminoides) , Tonka Absolute (Dipteryx odorata) , Benzoin Resinoid (Styrax tonkinensis pierre) , Vanilla Absolute (Vanilla planifolia) , Coconut Milk Powder (Cocos nucifera) (Cocos Nucifera (Coconut) Extract) , Turmeric Powder (Curcuma longa) , Cream of Tartar (Potassium Bitartrate) , Sodium Coco-Sulfate , Cocamidopropyl Betaine , Dipropylene Glycol , Silica , Tin Oxide (Tin oxide) , Coumarin , Eugenol , Fragrance , Iron Oxides .'
        },
        {
          'name': 'Color',
          'type': 'image',
          'value': 'Y315 - Sand',
          'href': 'https://bhisma.cloud/heh',
          'image': 'https://bhisma.cloud/heh',
          'variants': [
            {
              'value': 'Y316 - Sand',
              'href': 'https://bhisma.cloud/hehe', // link detail produk ke API
              'image': 'https://picsum.photos/68',
              'inStock': true,
              'isBestSeller': false
            },
            {
              'value': 'Y317 - Sand',
              'href': 'https://bhisma.cloud/hehe', // link detail produk ke API
              'image': 'https://picsum.photos/68',
              'inStock': false,
              'isBestSeller': false
            },
            {
              'value': 'Y318 - Sand',
              'href': 'https://bhisma.cloud/hehe', // link detail produk ke API
              'image': 'https://picsum.photos/68',
              'inStock': false,
              'isBestSeller': false
            },
            {
              'value': 'Y319 - Sand',
              'href': 'https://bhisma.cloud/hehe', // link detail produk ke API
              'image': 'https://picsum.photos/68',
              'inStock': false,
              'isBestSeller': false
            },
            {
              'value': 'Y320 - Sand',
              'href': 'https://bhisma.cloud/hehe', // link detail produk ke API
              'image': 'https://picsum.photos/68',
              'inStock': false,
              'isBestSeller': false
            },
            {
              'value': 'Y321 - Sand',
              'href': 'https://bhisma.cloud/hehe', // link detail produk ke API
              'image': 'https://picsum.photos/68',
              'inStock': false,
              'isBestSeller': false
            },
          ]
        }
      ]
    }
  },
  '/api/catalog/product/?page=1&q=coba&ordering=price': {
    'status': 200,
    'body': [
      {
        'href': 'https://bhisma.cloud/product/',
        'name': 'Sariayu Hijab Intense Series Shampoo Anti Dandruf',
        'image': 'https://bhisma.cloud/sariayu-image/',
        'price': {
          'rangeMin': 50000,
          'rangeMax': 120000
        },
        'brand': {
          'href': 'https://bhisma.cloud/sariayu/',
          'name': 'Sariayu'
        }
      },
      {
        'href': 'https://bhisma.cloud/product/',
        'name': 'SA ECONATURE NUTREAGE MOIST. LOTION NIGHT',
        'image': 'https://bhisma.cloud/sariayu-image/',
        'price': {
          'rangeMin': 100000,
          'rangeMax': 150000
        },
        'brand': {
          'href': 'https://bhisma.cloud/sariayu/',
          'name': 'Sariayu'
        },
      },
      {
        'href': 'https://bhisma.cloud/product/',
        'name': 'SA ECONATURE NUTREAGE MOIST. LOTION NIGHT',
        'image': 'https://bhisma.cloud/sariayu-image/',
        'price': {
          'rangeMin': 100000,
          'rangeMax': null
        },
        'brand': {
          'href': 'https://bhisma.cloud/sariayu/',
          'name': 'Sariayu'
        },
      },
      {
        'href': 'https://bhisma.cloud/product/',
        'name': 'SA ECONATURE NUTREAGE MOIST. LOTION NIGHT',
        'image': 'https://bhisma.cloud/sariayu-image/',
        'price': {
          'rangeMin': 180000,
          'rangeMax': null
        },
        'brand': {
          'href': 'https://bhisma.cloud/sariayu/',
          'name': 'Sariayu'
        },
      },
      {
        'href': 'https://bhisma.cloud/product/',
        'name': 'Mirabella ECONATURE NUTREAGE MOIST. LOTION NIGHT',
        'image': 'https://bhisma.cloud/sariayu-image/',
        'price': {
          'rangeMin': 80000,
          'rangeMax': 150000
        },
        'brand': {
          'href': 'https://bhisma.cloud/sariayu/',
          'name': 'Mirabella'
        },
      },
    ]
  },
  '/api/catalog/product/?ordering=-price': {
    'status': 200,
    'body': [
      {
        'href': 'https://bhisma.cloud/product/',
        'name': 'SA ECONATURE NUTREAGE MOIST. LOTION NIGHT',
        'image': 'https://bhisma.cloud/sariayu-image/',
        'price': {
          'rangeMin': 180000,
          'rangeMax': null
        },
        'brand': {
          'href': 'https://bhisma.cloud/sariayu/',
          'name': 'Sariayu'
        },
      },
      {
        'href': 'https://bhisma.cloud/product/',
        'name': 'SA ECONATURE NUTREAGE MOIST. LOTION NIGHT',
        'image': 'https://bhisma.cloud/sariayu-image/',
        'price': {
          'rangeMin': 100000,
          'rangeMax': 150000
        },
        'brand': {
          'href': 'https://bhisma.cloud/sariayu/',
          'name': 'Sariayu'
        },
      },
      {
        'href': 'https://bhisma.cloud/product/',
        'name': 'SA ECONATURE NUTREAGE MOIST. LOTION NIGHT',
        'image': 'https://bhisma.cloud/sariayu-image/',
        'price': {
          'rangeMin': 100000,
          'rangeMax': null
        },
        'brand': {
          'href': 'https://bhisma.cloud/sariayu/',
          'name': 'Sariayu'
        },
      },
      {
        'href': 'https://bhisma.cloud/product/',
        'name': 'SA ECONATURE NUTREAGE MOIST. LOTION NIGHT',
        'image': 'https://bhisma.cloud/sariayu-image/',
        'price': {
          'rangeMin': 80000,
          'rangeMax': 150000
        },
        'brand': {
          'href': 'https://bhisma.cloud/sariayu/',
          'name': 'Sariayu'
        },
      },
      {
        'href': 'https://bhisma.cloud/product/',
        'name': 'Sariayu Hijab Intense Series Shampoo Anti Dandruf',
        'image': 'https://bhisma.cloud/sariayu-image/',
        'price': {
          'rangeMin': 50000,
          'rangeMax': 120000
        },
        'brand': {
          'href': 'https://bhisma.cloud/sariayu/',
          'name': 'Sariayu'
        }
      },
    ]
  },
  '/api/catalog/product/?ordering=price': {
    'status': 200,
    'body': [
      {
        'href': 'https://bhisma.cloud/product/',
        'name': 'Sariayu Hijab Intense Series Shampoo Anti Dandruf',
        'image': 'https://bhisma.cloud/sariayu-image/',
        'price': {
          'rangeMin': 50000,
          'rangeMax': 120000
        },
        'brand': {
          'href': 'https://bhisma.cloud/sariayu/',
          'name': 'Sariayu'
        }
      },
      {
        'href': 'https://bhisma.cloud/product/',
        'name': 'SA ECONATURE NUTREAGE MOIST. LOTION NIGHT',
        'image': 'https://bhisma.cloud/sariayu-image/',
        'price': {
          'rangeMin': 80000,
          'rangeMax': 150000
        },
        'brand': {
          'href': 'https://bhisma.cloud/sariayu/',
          'name': 'Sariayu'
        },
      },
      {
        'href': 'https://bhisma.cloud/product/',
        'name': 'SA ECONATURE NUTREAGE MOIST. LOTION NIGHT',
        'image': 'https://bhisma.cloud/sariayu-image/',
        'price': {
          'rangeMin': 100000,
          'rangeMax': null
        },
        'brand': {
          'href': 'https://bhisma.cloud/sariayu/',
          'name': 'Sariayu'
        },
      },
      {
        'href': 'https://bhisma.cloud/product/',
        'name': 'SA ECONATURE NUTREAGE MOIST. LOTION NIGHT',
        'image': 'https://bhisma.cloud/sariayu-image/',
        'price': {
          'rangeMin': 100000,
          'rangeMax': 150000
        },
        'brand': {
          'href': 'https://bhisma.cloud/sariayu/',
          'name': 'Sariayu'
        },
      },
      {
        'href': 'https://bhisma.cloud/product/',
        'name': 'SA ECONATURE NUTREAGE MOIST. LOTION NIGHT',
        'image': 'https://bhisma.cloud/sariayu-image/',
        'price': {
          'rangeMin': 180000,
          'rangeMax': null
        },
        'brand': {
          'href': 'https://bhisma.cloud/sariayu/',
          'name': 'Sariayu'
        },
      },
    ]
  },
  '/api/catalog/brand/': {
    'status': 200,
    'body': [
      {
        'href': 'http://localhost:8000/brand/sariayu/',
        'name': 'Sariayu',
        'iconImage': 'http://localhost:8000/uploads/brands/icon/solo.jpeg',
        'showInHomepage': true,
        'sortPriority': 1,
        'brandImage': 'http://localhost:8000/uploads/brands/image/stop-it-that-kimochi-warui-when-your-kawaii-waifu-will-7626887.png',
        'description': 'Brand Sariayu',
        'picName': 'Ade',
        'picIdentityNumber': '000001',
        'picEmail': 'ade@ariston.com',
        'picPhoneNumber': '087884548878'
      },
      {
        'href': 'http://localhost:8000/brand/mirabella/',
        'name': 'Mirabella',
        'iconImage': 'http://localhost:8000/uploads/brands/icon/solo_44yWWIX.jpeg',
        'showInHomepage': true,
        'sortPriority': 2,
        'brandImage': 'http://localhost:8000/uploads/brands/image/stop-it-that-kimochi-warui-when-your-kawaii-waifu-will-7626887_QEIiquz.png',
        'description': 'Brand Mirabella',
        'picName': 'Fahmi',
        'picIdentityNumber': '000002',
        'picEmail': 'fahmi@delizia.com',
        'picPhoneNumber': '087884548878'
      },
      {
        'href': 'http://localhost:8000/brand/pac/',
        'name': 'PAC',
        'iconImage': 'http://localhost:8000/uploads/brands/icon/solo_44yWWIX.jpeg',
        'showInHomepage': true,
        'sortPriority': 2,
        'brandImage': 'http://localhost:8000/uploads/brands/image/stop-it-that-kimochi-warui-when-your-kawaii-waifu-will-7626887_QEIiquz.png',
        'description': 'Brand PAC',
        'picName': 'Fahmi',
        'picIdentityNumber': '000002',
        'picEmail': 'fahmi@delizia.com',
        'picPhoneNumber': '087884548878'
      }
    ]
  },
  '/api/catalog/categories/main-menu/': {
    'status': 200,
    'body':
      [
        {
          'name': 'Body Care',
          'href': 'http://testserver/categories/book',
          'fullSlug': 'body-care',
          'subCategory': [
            {
              'name': 'Body Wash',
              'href': 'http://testserver/categories/book/adult',
              'fullSlug': 'body-care/body-wash'
            },
            {
              'name': 'Body Scrub',
              'href': 'http://testserver/categories/book/adult/fiction',
              'fullSlug': 'body-care/body-scrub'
            }
          ]
        },
        {
          'name': 'Hair Care',
          'href': 'http://testserver/categories/stationary',
          'fullSlug': 'hair-care',
          'subCategory': [
            {
              'name': 'Shampoo',
              'href': 'http://testserver/categories/stationary/pen',
              'fullSlug': 'hair-care/shampoo'
            }
          ]
        }
      ]
  },
  '/api/catalog/cart/': {
    'status': 200,
    'body': {
      'cartTotals': {
        'grandTotal': 826000,
        'subTotal': 900000,
        'taxTotal': 66000,
        'shippingTotal': 0,
        'discountTotal': 140000
      },
      'lineItems': [
        {
          'quantity': 2,
          'lineTotals': {
            'price': 660000,
            'discount': 140000
          },
          'tax': {
            'name': 'PPN',
            'href': 'https://sdlfkjsldkfjsdf/ppn'
          },
          'discount': [
            {'name': 'Stupid Promo Thing', 'href': ''}
          ],
          'href': 'https://bhisma.cloud/api/order/cart/1/line/1',
          'product': {
            'name': 'PAC Studio 1',
            'description': '',
            'sku': '',
            'vendor': {
              'name': 'PAC',
              'href': 'https://bhisma.cloud/api/catalog/vendor/1'
            },
            'unitPrice': {
              'current': 330000,
              'regular': 400000
            },
            'image': 'https://picsum.photos/112',
            'href': 'https://bhisma.cloud/catalog/product/123'
          },
          'warehouse': {
            'href': '',
            'name': 'Taman Anggrek'
          }

        },
        {
          'quantity': 3,
          'lineTotals': {
            'price': 660000,
            'discount': 140000
          },
          'tax': {
            'name': 'PPN',
            'href': 'https://sdlfkjsldkfjsdf/ppn'
          },
          'discount': [
            {'name': 'Stupid Promo Thing', 'href': ''}
          ],
          'href': 'https://bhisma.cloud/api/order/cart/1/line/1',
          'product': {
            'name': 'PAC Studio 2',
            'description': '',
            'sku': '',
            'vendor': {
              'name': 'PAC',
              'href': 'https://bhisma.cloud/api/catalog/vendor/1'
            },
            'unitPrice': {
              'current': 330000,
              'regular': 400000
            },
            'image': 'https://picsum.photos/112',
            'href': 'https://bhisma.cloud/catalog/product/123'
          },
          'warehouse': {
            'href': '',
            'name': 'Taman Anggrek'
          }

        },
        {
          'quantity': 1,
          'lineTotals': {
            'price': 100000,
            'discount': 0
          },
          'tax': {},
          'discount': {},
          'href': 'https://bhisma.cloud/api/order/cart/1/line/2',
          'product': {
            'name': 'PAC Studio 3',
            'description': '',
            'sku': '',
            'vendor': {
              'name': 'PAC',
              'href': 'https://bhisma.cloud/api/catalog/vendor/1'
            },
            'unitPrice': {
              'current': 100000,
              'regular': 0
            },
            'image': 'https://picsum.photos/112',
            'href': 'https://bhisma.cloud/catalog/product/123'
          },
          'warehouse': {
            'href': '',
            'name': 'Central Park'
          }
        },
        {
          'quantity': 1,
          'lineTotals': {
            'price': 100000,
            'discount': 0
          },
          'tax': {},
          'discount': {},
          'href': 'https://bhisma.cloud/api/order/cart/1/line/2',
          'product': {
            'name': 'PAC Studio 3',
            'description': '',
            'sku': '',
            'vendor': {
              'name': 'PAC',
              'href': 'https://bhisma.cloud/api/catalog/vendor/1'
            },
            'unitPrice': {
              'current': 100000,
              'regular': 0
            },
            'image': 'https://picsum.photos/112',
            'href': 'https://bhisma.cloud/catalog/product/123'
          },
          'warehouse': {
            'href': '',
            'name': 'Central Park'
          }
        },
        {
          'quantity': 1,
          'lineTotals': {
            'price': 100000,
            'discount': 0
          },
          'tax': {},
          'discount': {},
          'href': 'https://bhisma.cloud/api/order/cart/1/line/2',
          'product': {
            'name': 'PAC Studio 3',
            'description': '',
            'sku': '',
            'vendor': {
              'name': 'PAC',
              'href': 'https://bhisma.cloud/api/catalog/vendor/1'
            },
            'unitPrice': {
              'current': 100000,
              'regular': 0
            },
            'image': 'https://picsum.photos/112',
            'href': 'https://bhisma.cloud/catalog/product/123'
          },
          'warehouse': {
            'href': '',
            'name': 'Central Park'
          }
        }
      ]
    }
  },
  '/api/catalog/product/?page=1&q=coba&brand=Mirabella&ordering=price': {
    'status': 200,
    'body': [
      {
        'href': 'https://bhisma.cloud/product/',
        'name': 'Mirabella Hijab Intense Series Shampoo Anti Dandruf',
        'image': 'https://bhisma.cloud/sariayu-image/',
        'price': {
          'rangeMin': 50000,
          'rangeMax': 120000
        },
        'brand': {
          'href': 'https://bhisma.cloud/sariayu/',
          'name': 'Mirabella'
        }
      }
    ]
  },
  '/api/catalog/product/?page=1&q=coba&brand=Sariayu&ordering=price': {
    'status': 200,
    'body': [
      {
        'href': 'https://bhisma.cloud/product/',
        'name': 'Sariayu Hijab Intense Series Shampoo Anti Dandruf',
        'image': 'https://bhisma.cloud/sariayu-image/',
        'price': {
          'rangeMin': 50000,
          'rangeMax': 120000
        },
        'brand': {
          'href': 'https://bhisma.cloud/sariayu/',
          'name': 'Sariayu'
        }
      },
      {
        'href': 'https://bhisma.cloud/product/',
        'name': 'SA ECONATURE NUTREAGE MOIST. LOTION NIGHT',
        'image': 'https://bhisma.cloud/sariayu-image/',
        'price': {
          'rangeMin': 100000,
          'rangeMax': 150000
        },
        'brand': {
          'href': 'https://bhisma.cloud/sariayu/',
          'name': 'Sariayu'
        },
      },
      {
        'href': 'https://bhisma.cloud/product/',
        'name': 'SA ECONATURE NUTREAGE MOIST. LOTION NIGHT',
        'image': 'https://bhisma.cloud/sariayu-image/',
        'price': {
          'rangeMin': 100000,
          'rangeMax': null
        },
        'brand': {
          'href': 'https://bhisma.cloud/sariayu/',
          'name': 'Sariayu'
        },
      },
      {
        'href': 'https://bhisma.cloud/product/',
        'name': 'SA ECONATURE NUTREAGE MOIST. LOTION NIGHT',
        'image': 'https://bhisma.cloud/sariayu-image/',
        'price': {
          'rangeMin': 180000,
          'rangeMax': null
        },
        'brand': {
          'href': 'https://bhisma.cloud/sariayu/',
          'name': 'Sariayu'
        },
      },
    ]
  },
  '/api/catalog/product-lines/': {
    'status': 200,
    'body': [
      {
        'href': 'https://catalog/product-lines-1/',
        'name': 'Sariayu Product Lines',
        'banner': 'assets/brand-detail/example-product-line-banner.png',
        'backgroundImage': 'assets/brand-detail/background-example-product-line.png',
        'brand': {
          'href': 'https://brand-api/sariayu/',
          'brandImage': 'assets/brand-detail/single-banner-sariayu-example.png',
          'name': 'Sariayu'
        },
        'product': [
          {
            'href': 'https://product-api/product/',
            'name': 'Sariayu Hijab Intense Series Shampoo Anti Dandruf',
            'image': 'assets/product-example.png',
            'price': {
              'rangeMin': 50000,
              'rangeMax': 120000,
              'rangeMinDiscounted': 26000,
              'rangeMaxDiscounted': 50000
            },
          },
          {
            'href': 'https://product-api/product/',
            'name': 'Sariayu Hijab Intense Series Shampoo Anti Dandruf',
            'image': 'assets/product-example.png',
            'price': {
              'rangeMin': 50000,
              'rangeMax': 120000,
              'rangeMinDiscounted': 26000,
              'rangeMaxDiscounted': 50000
            },
          },
          {
            'href': 'https://product-api/product/',
            'name': 'Sariayu Hijab Intense Series Shampoo Anti Dandruf',
            'image': 'assets/product-example.png',
            'price': {
              'rangeMin': 50000,
              'rangeMax': null,
              'rangeMinDiscounted': null,
              'rangeMaxDiscounted': null
            },
          },
          {
            'href': 'https://product-api/product/',
            'name': 'Sariayu Hijab Intense Series Shampoo Anti Dandruf',
            'image': 'assets/product-example.png',
            'price': {
              'rangeMin': 50000,
              'rangeMax': 120000,
              'rangeMinDiscounted': null,
              'rangeMaxDiscounted': null
            },
          }
        ]
      },
      {
        'href': 'https://catalog/product-lines-1/',
        'name': 'Sariayu Product Lines',
        'banner': 'assets/brand-detail/example-product-line-banner.png',
        'backgroundImage': 'assets/brand-detail/background-example-product-line.png',
        'brand': {
          'href': 'https://brand-api/sariayu/',
          'brandImage': 'assets/brand-detail/single-banner-sariayu-example.png',
          'name': 'Sariayu'
        },
        'product': [
          {
            'href': 'https://product-api/product/',
            'name': 'Sariayu Hijab Intense Series Shampoo Anti Dandruf',
            'image': 'assets/product-example.png',
            'price': {
              'rangeMin': 50000,
              'rangeMax': 120000,
              'rangeMinDiscounted': 26000,
              'rangeMaxDiscounted': 50000
            },
          },
          {
            'href': 'https://product-api/product/',
            'name': 'Sariayu Hijab Intense Series Shampoo Anti Dandruf',
            'image': 'assets/product-example.png',
            'price': {
              'rangeMin': 50000,
              'rangeMax': 120000,
              'rangeMinDiscounted': 26000,
              'rangeMaxDiscounted': 50000
            },
          },
          {
            'href': 'https://product-api/product/',
            'name': 'Sariayu Hijab Intense Series Shampoo Anti Dandruf',
            'image': 'assets/product-example.png',
            'price': {
              'rangeMin': 50000,
              'rangeMax': null,
              'rangeMinDiscounted': null,
              'rangeMaxDiscounted': null
            },
          },
          {
            'href': 'https://product-api/product/',
            'name': 'Sariayu Hijab Intense Series Shampoo Anti Dandruf',
            'image': 'assets/product-example.png',
            'price': {
              'rangeMin': 50000,
              'rangeMax': 120000,
              'rangeMinDiscounted': null,
              'rangeMaxDiscounted': null
            },
          }
        ]
      }
    ]
  },
  '/api/iam/addresses/': {
    'status': 200,
    'body': [
      {
        'id': 672418,
        'href': 'https://gramedia.com',
        'user': 'Rio Trilaksono Putro',
        'name': 'office',
        'shipToName': 'Rio',
        'country': 'IDN',
        'state': 'DKI Jakarta',
        'city': 'Kota Jakarta Pusat',
        'district': 'Gelora',
        'street': 'Jl. Palmerah Selatan No. 21',
        'zipcode': '12010',
        'phoneNumber': '081252353137',
        'isDefaultShipping': true,
        'isDefaultBilling': true
      },
      {
        'id': 672418,
        'href': 'https://gramedia.com',
        'user': 'Rio Trilaksono Putro',
        'name': 'home',
        'shipToName': 'Rio',
        'country': 'IDN',
        'state': 'DKI Jakarta',
        'city': 'Kota Jakarta Selatan',
        'district': 'Kebayoran Lama',
        'street': 'Jl. Azhari No. 29',
        'zipcode': '12701',
        'phoneNumber': '081252353137',
        'isDefaultShipping': false,
        'isDefaultBilling': false
      }
    ]
  },
  '/api/order/payment-method/': {
    'status': 200,
    'body': [
      {
        'paymentGroupTitle': 'Transfer Bank',
        'code': 'bank-transfer',
        'child': [
          {
            'code': 'bca-va',
            'description': 'lorem ipsum',
            'isDefault': 'true',
            'logo': 'assets/footer/logo/logo-bca.svg',
            'title': 'ATM Transfer BCA (Otomatis)'
          }
        ]
      }
    ]
  },
  '/api/order/shipping-method/': {
    'status': 200,
    'body': [
      {
        'name': 'Standar Logistik',
        'price': 20000,
        'eta': '2-3 hari kerja'
      },
      {
        'name': 'Sameday Delivery',
        'price': 20000,
        'eta': '6 jam'
      },
      {
        'name': 'Pickup in Store',
        'price': 0,
        'eta': ''
      }
    ]
  }
};
