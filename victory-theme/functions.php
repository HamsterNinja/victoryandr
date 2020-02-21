<?php
if ( class_exists( 'Timber' ) ){
    Timber::$cache = false;
}
//Скрытие версии wp
add_filter('the_generator', '__return_empty_string');

//TODO: Отключение авторизации rest. Удалить на production
function wc_authenticate_alter(){   
    return new WP_User( 1 );
}
add_filter( 'woocommerce_api_check_authentication', 'wc_authenticate_alter', 1 );
add_filter( 'woocommerce_rest_check_permissions', 'my_woocommerce_rest_check_permissions', 90, 4 );
function my_woocommerce_rest_check_permissions( $permission, $context, $object_id, $post_type  ){
  return true;
}

include_once(get_template_directory() .'/include/Timber/Integrations/WooCommerce/WooCommerce.php');
include_once(get_template_directory() .'/include/Timber/Integrations/WooCommerce/ProductsIterator.php');
include_once(get_template_directory() .'/include/Timber/Integrations/WooCommerce/Product.php');

add_action( 'after_setup_theme', function() {
    add_theme_support( 'woocommerce' );
} );

if ( class_exists( 'WooCommerce' ) ) {
    Timber\Integrations\WooCommerce\WooCommerce::init();
}

add_image_size( 'blog_image', 438, 257, true ); 
add_image_size( 'catalog_image', 360, 370, true ); 
add_image_size( 'catalog_image_x2', 720, 405, true ); 

remove_action( 'wp_head', 'print_emoji_detection_script', 7 );
remove_action( 'admin_print_scripts', 'print_emoji_detection_script' );
remove_action( 'wp_print_styles', 'print_emoji_styles' );
remove_action( 'admin_print_styles', 'print_emoji_styles' ); 
remove_filter( 'the_content_feed', 'wp_staticize_emoji' );
remove_filter( 'comment_text_rss', 'wp_staticize_emoji' ); 
remove_filter( 'wp_mail', 'wp_staticize_emoji_for_email' );
add_filter( 'tiny_mce_plugins', 'disable_wp_emojis_in_tinymce' );
function disable_wp_emojis_in_tinymce( $plugins ) {
    if ( is_array( $plugins ) ) {
        return array_diff( $plugins, array( 'wpemoji' ) );
    } else {
        return array();
    }
}
function true_remove_default_widget() {
	unregister_widget('WP_Widget_Archives'); 
	unregister_widget('WP_Widget_Calendar');
	unregister_widget('WP_Widget_Categories'); 
	unregister_widget('WP_Widget_Meta'); 
	unregister_widget('WP_Widget_Pages');
	unregister_widget('WP_Widget_Recent_Comments'); 
	unregister_widget('WP_Widget_Recent_Posts'); 
	unregister_widget('WP_Widget_RSS'); 
	unregister_widget('WP_Widget_Search'); 
	unregister_widget('WP_Widget_Tag_Cloud'); 
	unregister_widget('WP_Widget_Text'); 
	unregister_widget('WP_Nav_Menu_Widget'); 
}
 
add_filter( 'woocommerce_enqueue_styles', '__return_empty_array' );

add_action( 'widgets_init', 'true_remove_default_widget', 20 );
add_theme_support('post-thumbnails');

register_nav_menus(array(
    'menu_header' => 'Верхнее меню',
    'menu_footer' => 'Нижнее меню',
));

function add_async_forscript($url)
{
    if (strpos($url, '#asyncload')===false)
        return $url;
    else if (is_admin())
        return str_replace('#asyncload', '', $url);
    else
        return str_replace('#asyncload', '', $url)."' defer='defer"; 
}

add_filter('clean_url', 'add_async_forscript', 11, 1);
function time_enqueuer($my_handle, $relpath, $type='script', $async='false', $media="all",  $my_deps=array()) {
    if($async == 'true'){
        $uri = get_theme_file_uri($relpath.'#asyncload');
    }
    else{
        $uri = get_theme_file_uri($relpath);
    }
    $vsn = filemtime(get_theme_file_path($relpath));
    if($type == 'script') wp_enqueue_script($my_handle, $uri, $my_deps, $vsn);
    else if($type == 'style') wp_enqueue_style($my_handle, $uri, $my_deps, $vsn, $media);      
}

add_action('wp_footer', 'add_scripts');
function add_scripts() {
    time_enqueuer('jquerylatest', '/assets/js/vendors/jquery-3.2.0.min.js', 'script', true);
    time_enqueuer('slick', '/assets/js/vendors/slick.js', 'script', true);
    time_enqueuer('onepagescrolljs', '/assets/js/vendors/onepagescroll.js', 'script', true);
    time_enqueuer('main.bundle', '/assets/js/bundle.js', 'script', true);
    
    wp_localize_script( 'app', 'SITEDATA', array(
        'url' => get_site_url(),
        'themepath' => get_template_directory_uri(),
        'ajax_url' => admin_url('admin-ajax.php'),
    ));
}

//wp-embed.min.js remove
remove_action( 'wp_head', 'wp_oembed_add_discovery_links' );
remove_action( 'wp_head', 'wp_oembed_add_host_js' );

//remove jquery-migrate
function dequeue_jquery_migrate( $scripts ) {
	if ( ! is_admin() && ! empty( $scripts->registered['jquery'] ) ) {
		$jquery_dependencies = $scripts->registered['jquery']->deps;
		$scripts->registered['jquery']->deps = array_diff( $jquery_dependencies, array( 'jquery-migrate' ) );
	}
}
add_action( 'wp_default_scripts', 'dequeue_jquery_migrate' );

function add_styles() {
        if(is_admin()) return false;
        time_enqueuer('onepagescrollcss', '/assets/css/onepagescroll.css', 'style', false, 'all'); 
        time_enqueuer('main', '/assets/css/main.css', 'style', false, 'all');    
        time_enqueuer('mediacss', '/assets/css/media-requests.css', 'style', false, 'all');   
}
add_action('wp_print_styles', 'add_styles');

if( function_exists('acf_add_options_page') ) {
    acf_add_options_page(array(
        'page_title'    => 'Основные настройки',
        'menu_title'    => 'Основные настройки',
        'menu_slug'     => 'options',
        'capability'    => 'edit_posts',
        'redirect'      => false
    ));
}

Timber::$dirname = array('templates', 'views');
class StarterSite extends TimberSite {
	function __construct() {
		add_theme_support( 'post-formats' );
        add_theme_support( 'post-thumbnails' );
        add_theme_support( 'woocommerce' );
        add_theme_support( 'menus' );
        add_filter( 'timber_context', array( $this, 'add_to_context' ) );
		add_theme_support( 'html5', array( 'comment-list', 'comment-form', 'search-form', 'gallery', 'caption' ) );
        parent::__construct();
    }
    
    function add_to_context( $context ) {
        $context['menu_header'] = new TimberMenu('menu_header');      
        
		return $context;
	}
}
new StarterSite();

function timber_set_product( $post ) {
    global $product;
    
    if ( is_woocommerce() || is_home() || is_page('filter') ) {
        $product = wc_get_product( $post->ID );
    }
}

function woocommerce_script_cleaner() {
	// Remove the generator tag
	remove_action( 'wp_head', array( $GLOBALS['woocommerce'], 'generator' ) );
	wp_dequeue_style( 'woocommerce_frontend_styles' );
	wp_dequeue_style( 'woocommerce-general');
	wp_dequeue_style( 'woocommerce-layout' );
	wp_dequeue_style( 'woocommerce-smallscreen' );
	wp_dequeue_style( 'woocommerce_fancybox_styles' );
	wp_dequeue_style( 'woocommerce_chosen_styles' );
	wp_dequeue_style( 'woocommerce_prettyPhoto_css' );
	wp_dequeue_script( 'selectWoo' );
	wp_deregister_script( 'selectWoo' );
	wp_dequeue_script( 'wc-add-payment-method' );
	wp_dequeue_script( 'wc-lost-password' );
	wp_dequeue_script( 'wc_price_slider' );
	wp_dequeue_script( 'wc-single-product' );
	// wp_dequeue_script( 'wc-cart-fragments' );
	wp_dequeue_script( 'wc-credit-card-form' );
	wp_dequeue_script( 'wc-checkout' );
	wp_dequeue_script( 'wc-add-to-cart-variation' );
	wp_dequeue_script( 'wc-single-product' );
	wp_dequeue_script( 'wc-cart' );
	wp_dequeue_script( 'wc-chosen' );
	wp_dequeue_script( 'woocommerce' );
	wp_dequeue_script( 'prettyPhoto' );
	wp_dequeue_script( 'prettyPhoto-init' );
	wp_dequeue_script( 'jquery-blockui' );
	wp_dequeue_script( 'jquery-placeholder' );
	wp_dequeue_script( 'jquery-payment' );
	wp_dequeue_script( 'fancybox' );
	wp_dequeue_script( 'jqueryui' );
	if ( ! is_woocommerce() && ! is_cart() && ! is_checkout() ) {
        // wp_dequeue_script( 'wc-add-to-cart' );
    }
}
add_action( 'wp_enqueue_scripts', 'woocommerce_script_cleaner', 99 );

//Disable gutenberg style in Front
function wps_deregister_styles() {
    wp_dequeue_style( 'wp-block-library' );
}
add_action( 'wp_print_styles', 'wps_deregister_styles', 100 );

//remove type js and css for validator
add_action('wp_loaded', 'prefix_output_buffer_start');
function prefix_output_buffer_start() { 
    ob_start("prefix_output_callback"); 
}
add_action('shutdown', 'prefix_output_buffer_end');
function prefix_output_buffer_end() { 
    ob_end_flush(); 
}
function prefix_output_callback($buffer) {
    return preg_replace( "%[ ]type=[\'\"]text\/(javascript|css)[\'\"]%", '', $buffer );
}

include_once(get_template_directory() .'/include/acf-fields.php');
include_once(get_template_directory() .'/include/woocommerce-theme-settings.php');
include_once(get_template_directory() .'/include/rest-api.php');