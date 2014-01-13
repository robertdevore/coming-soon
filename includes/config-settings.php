<?php
/**
 * Config
 *
 * @package WordPress
 * @subpackage seed_csp4
 * @since 0.1.0
 */

/**
 * Config Settings
 */

    function hitme( )
    {
        //var_dump('hit');
    }
function seed_csp4_get_options(){
    

    /**
     * Create new menus
     */

    $seed_csp4_options[ ] = array(
        "type" => "menu",
        "menu_type" => "add_options_page",
        "page_name" => __( "Coming Soon", 'coming-soon' ),
        "menu_slug" => "seed_csp4",
        "layout" => "2-col" 
    );

    $seed_csp4_options[ ] = array(
        "type" => "setting",
        "id" => "seed_csp4_settings",
    );


    $seed_csp4_options[ ] = array(
        "type" => "tab",
        "id" => "content",
        "label" => __( "Content", 'coming-soon' ),
    );

    /**
     * Settings Tab
     */

    $seed_csp4_options[ ] = array(
        "type" => "section",
        "id" => "seed_csp4_section_1_1",
        "label" => __( "General", 'coming-soon' ),
    );

    $seed_csp4_options[ ] = array(
        "type" => "radio",
        "id" => "status",
        "label" => __( "Status", 'coming-soon' ),
        "option_values" => array(
            '0' => __( 'Disabled', 'coming-soon' ),
            '1' => __( 'Enable Coming Soon Mode', 'coming-soon' ),
            '2' => __( 'Enable Maintenance Mode', 'coming-soon' ) 
        ),
        "desc" => __( "When you are logged in you'll see your normal website. Logged out visitors will see the Coming Soon or Maintenance page. Coming Soon Mode will be available to search engines if your site is not private. Maintenance Mode will notify search engines that the site is unavailable.", 'coming-soon' ),
        "default_value" => "0" 
    );


    $csp4_maintenance_file = WP_CONTENT_DIR."/maintenance.php";
    if (file_exists($csp4_maintenance_file)) {
    $seed_csp4_options[ ] = array(
        "type" => "checkbox",
        "id" => "enable_maintenance_php",
        "label" => __( "Use maintenance.php", 'coming-soon' ),
        "desc" => __('maintenance.php detected, would you like to use this for your maintenance page?', 'coming-soon'),
        "option_values" => array(
             'name' => __( 'Yes', 'coming-soon' ),
             //'required' => __( 'Make Name Required', 'coming-soon' ),
        ) 
    );
    }

    // Page Setttings
    $seed_csp4_options[ ] = array(
        "type" => "section",
        "id" => "seed_csp4_section_1_2",
        "label" => __( "Page Settings", 'coming-soon' ) 
    );

    $seed_csp4_options[ ] = array(
        "type" => "upload",
        "id" => "logo",
        "label" => __( "Logo", 'coming-soon' ),
        "desc" => __('Upload a logo or teaser image (or) enter the url to your image.', 'coming-soon'),
    );

    $seed_csp4_options[ ] = array(
        "type" => "textbox",
        "id" => "headline",
        "class" => "large-text",
        "label" => __( "Headline", 'coming-soon' ),
        "desc" => __( "Enter a headline for your page. Replace the default headline if it exists.", 'coming-soon' ), 
    );

    $seed_csp4_options[ ] = array(
        "type" => "wpeditor",
        "id" => "description",
        "label" => __( "Description", 'coming-soon' ),
        "desc" => __( "Tell the visitor what to expect from your site. Also supports WordPress shortcodes and <a href='http://codex.wordpress.org/Embeds' target='_target'>video embeds</a>.", 'coming-soon' ),
        "class" => "large-text" 
    );


    // Header
    $seed_csp4_options[ ] = array(
        "type" => "section",
        "id" => "seed_csp4_section_1_8",
        "label" => __( "Header", 'coming-soon' ) 
    );

    $seed_csp4_options[ ] = array(
        "type" => "upload",
        "id" => "favicon",
        "label" => __( "Favicon", 'coming-soon' ),
        "desc" => __('Favicons are displayed in a browser tab. Need Help <a href="http://tools.dynamicdrive.com/favicon/" target="_blank">creating a favicon</a>?', 'coming-soon'),
    );

    $seed_csp4_options[ ] = array(
        "type" => "textbox",
        "id" => "seo_title",
        "label" => __( "SEO Title", 'coming-soon' ),
        "desc" => __('If left empty the <a href="http://www.seomoz.org/learn-seo/title-tag" target="_blank">title tag</a> of your page will be: ', 'coming-soon').get_bloginfo( 'description', 'display' ).' - '.get_bloginfo('name','Display'), 
    );

    $seed_csp4_options[ ] = array(
        "type" => "textarea",
        "id" => "seo_description",
        "label" => __( "SEO Meta Description", 'coming-soon' ),
        "desc" => __('If left empty the <a href="http://www.seomoz.org/learn-seo/meta-description" target="_blank">meta description</a> of your page will be: ', 'coming-soon').get_bloginfo( 'description', 'display' ),
        "class" => "large-text" 
    );


    $seed_csp4_options[ ] = array(
        "type" => "textarea",
        "id" => "ga_analytics",
        "class" => "large-text",
        "label" => __( "Analytics Code", 'coming-soon' ),
        "desc" => __('Paste in your Universal or Classic <a href="http://www.google.com/analytics/" target="_blank">Google Analytics</a> code.', 'coming-soon'),
    );


    /**
     * Design Tab
     */
    $seed_csp4_options[ ] = array(
        "type" => "tab",
        "id" => "design",
        "label" => __( "Design", 'coming-soon' ) 
    );


    // Background
    $seed_csp4_options[ ] = array(
        "type" => "section",
        "id" => "seed_csp4_section_2_1",
        "label" => __( "Background", 'coming-soon' ) 
    );


    $seed_csp4_options[ ] = array(
        "type" => "color",
        "id" => "bg_color",
        "label" => __( "Background Color", 'coming-soon' ),
        "default_value" => "#ffffff",
        "validate" => 'color',
        "desc" => __( "Choose between having a solid color background or uploading an image. By default images will cover the entire background.", 'coming-soon' ) 
    );


    $seed_csp4_options[ ] = array(
        "type" => "upload",
        "id" => "bg_image",
        "label" => __( "Background Image", 'coming-soon' ),  
    );

    $seed_csp4_options[ ] = array(
        "type" => "checkbox",
        "id" => "bg_cover",
        "label" => __( "Responsive Background", 'coming-soon' ),
        "desc" => __("This will scale the image to the smallest size such that both its width and its height can fit inside the content area. The image will be stretched for older browsers.", 'coming-soon'),
        "option_values" => array(
             '1' => __( 'Yes', 'coming-soon' ),
        ), 
    );

    $seed_csp4_options[ ] = array(
        "type" => "select",
        "id" => "bg_repeat",
        "label" => __( "Background Repeat", 'coming-soon' ),
        "option_values" => array(
            'no-repeat' => __( 'No-Repeat', 'coming-soon' ),
            'repeat' => __( 'Tile', 'coming-soon' ),
            'repeat-x' => __( 'Tile Horizontally', 'coming-soon' ),
            'repeat-y' => __( 'Tile Vertically', 'coming-soon' ),
        )
    );


    $seed_csp4_options[ ] = array(
        "type" => "select",
        "id" => "bg_position",
        "label" => __( "Background Position", 'coming-soon' ),
        "option_values" => array(
            'left top' => __( 'Left Top', 'coming-soon' ),
            'left center' => __( 'Left Center', 'coming-soon' ),
            'left bottom' => __( 'Left Bottom', 'coming-soon' ),
            'right top' => __( 'Right Top', 'coming-soon' ),
            'right center' => __( 'Right Center', 'coming-soon' ),
            'right bottom' => __( 'Right Bottom', 'coming-soon' ),
            'center top' => __( 'Center Top', 'coming-soon' ),
            'center center' => __( 'Center Center', 'coming-soon' ),
            'center bottom' => __( 'Center Bottom', 'coming-soon' ),
        )
    );

    $seed_csp4_options[ ] = array(
        "type" => "select",
        "id" => "bg_attahcment",
        "label" => __( "Background Attachment", 'coming-soon' ),
        "option_values" => array(
            'fixed' => __( 'Fixed', 'coming-soon' ),
            'scroll' => __( 'Scroll', 'coming-soon' ),
        )
    );


    // Text
    $seed_csp4_options[ ] = array(
        "type" => "section",
        "id" => "seed_csp4_section_2_2",
        "label" => __( "Text", 'coming-soon' ) 
    );

    $seed_csp4_options[ ] = array(
        "type" => "color",
        "id" => "text_color",
        "label" => __( "Text Color", 'coming-soon' ),
        "default_value" => "#ffffff",
        "validate" => 'required,color',
    );

    $seed_csp4_options[ ] = array(
        "type" => "color",
        "id" => "link_color",
        "label" => __( "Link Color", 'coming-soon' ),
        "default_value" => "#ffffff",
        "validate" => 'required,color',
    );

    $seed_csp4_options[ ] = array(
        "type" => "color",
        "id" => "headline_color",
        "label" => __( "Headline Color", 'coming-soon' ),
        "validate" => 'color',
        "desc" => __('If no Headline Color is chosen then the Link &amp; Button Color will be used. ','coming-soon'),
    );



    $seed_csp4_options[ ] = array(
        "type" => "select",
        "id" => "text_font",
        "label" => __( "Text Font", 'coming-soon' ),
        "option_values" => apply_filters('seed_csp4_fonts',array(
            'Default Fonts' =>array(
            '_arial'     => 'Arial',
            '_arial_black' =>'Arial Black',
            '_georgia'   => 'Georgia',
            '_helvetica_neue' => 'Helvetica Neue',
            '_impact' => 'Impact',
            '_lucida' => 'Lucida Grande',
            '_palatino'  => 'Palatino',
            '_tahoma'    => 'Tahoma',
            '_times'     => 'Times New Roman',
            '_trebuchet' => 'Trebuchet',
            '_verdana'   => 'Verdana',),
            ) ),
        //"desc" => __( "If you do not choose a text font then fefault font will be used.", 'coming-soon' ),
    );


    // Template
    $seed_csp4_options[ ] = array(
        "type" => "section",
        "id" => "seed_csp4_section_2_9",
        "label" => __( "Template", 'coming-soon' ) 
    );


    $seed_csp4_options[ ] = array(
        "type" => "textarea",
        "id" => "custom_css",
        "class" => "all-options",
        "label" => __( "Custom CSS", 'coming-soon' ),
        "desc" => __('Need to tweaks the styles? Add your custom CSS here.','coming-soon'),
    );

    /**
     * Advanced Tab
     */
    $seed_csp4_options[ ] = array(
        "type" => "tab",
        "id" => "advanced",
        "label" => __( "Advanced", 'coming-soon' ) 
    );


    // Scripts
    $seed_csp4_options[ ] = array(
        "type" => "section",
        "id" => "seed_csp4_section_4_3",
        "label" => __( "Scripts", 'coming-soon' ) 
    );

    $seed_csp4_options[ ] = array(
        "type" => "textarea",
        "id" => "header_scripts",
        "label" => __( "Header Scripts", 'coming-soon' ),
        "desc" => __('Enter any custom scripts. You can enter Javascript or CSS. This will be rendered before the closing head tag.', 'coming-soon'),
        "class" => "large-text" 
    );

    $seed_csp4_options[ ] = array(
        "type" => "textarea",
        "id" => "footer_scripts",
        "label" => __( "Footer Scripts", 'coming-soon' ),
        "desc" => __('Enter any custom scripts. This will be rendered before the closing body tag.', 'coming-soon'),
        "class" => "large-text" 
    );


    return $seed_csp4_options;

}