<?php

// Filter & Function to rename the WordPress logout URL
add_filter( 'logout_url', 'my_logout_page', 10, 2 );
function my_logout_page( $logout_url) {
    return home_url( '/admin');   // The name of your new login file
}

// Filter & Function to rename Lost Password URL
add_filter( 'lostpassword_url', 'my_lost_password_page', 10, 2 );
function my_lost_password_page( $lostpassword_url ) {
    return home_url( '/admin?action=lostpassword');   // The name of your new login file
}

add_action('init','redirect_login_page');
function redirect_login_page() {
    $login_url  = home_url( '/admin' );
    $url = basename($_SERVER['REQUEST_URI']); // get requested URL
    isset( $_REQUEST['redirect_to'] ) ? ( $url   = "wp-login.php" ): 0; // if users ssend request to wp-admin
    if( $url  == "wp-login.php" && $_SERVER['REQUEST_METHOD'] == 'GET')  {
        wp_redirect( $login_url );
        exit;
    }
}

add_filter( 'login_errors', 'error_handler');
function error_handler() {
    $login_page  = home_url( '/admin' );
    global $errors;
    $err_codes = $errors->get_error_codes(); // get WordPress built-in error codes
    $_SESSION["err_codes"] =  $err_codes;
    wp_redirect( $login_page ); // keep users on the same page
    exit;
}

$err_codes = isset( $_SESSION["err_codes"] )? $_SESSION["err_codes"] : 0;
    if( $err_codes !== 0 ){
        echo display_error_message(  $err_codes );
}

function display_error_message( $err_code ){
    // Invalid username.
    if ( in_array( 'invalid_username', $err_code ) ) {
        $error = '<strong>ERROR</strong>: Invalid username.';
    }
    // Incorrect password.
    if ( in_array( 'incorrect_password', $err_code ) ) {
        $error = '<strong>ERROR</strong>: The password you entered is incorrect.';
    }
    // Empty username.
    if ( in_array( 'empty_username', $err_code ) ) {
        $error = '<strong>ERROR</strong>: The username field is empty.';
    }
    // Empty password.
    if ( in_array( 'empty_password', $err_code ) ) {
        $error = '<strong>ERROR</strong>: The password field is empty.';
    }
    // Empty username and empty password.
    if( in_array( 'empty_username', $err_code )  &&  in_array( 'empty_password', $err_code )){
        $error = '<strong>ERROR</strong>: The username and password are empty.';
    }
    return $error;
}

// if ( ! is_user_logged_in() ) { // Display WordPress login form:
//     $args = array(
//         'redirect' => admin_url(), 
//         'form_id' => 'loginform-custom',
//         'label_username' => __( 'Username custom text' ),
//         'label_password' => __( 'Password custom text' ),
//         'label_remember' => __( 'Remember Me custom text' ),
//         'label_log_in' => __( 'Log In custom text' ),
//         'remember' => true
//     );
//     wp_login_form( $args );
// } else { // If logged in:
//     wp_loginout( home_url() ); // Display "Log Out" link.
//     echo " | ";
//     wp_register('', ''); // Display "Site Admin" link.
// }