{{--
  Template Name: Custom Login Page
--}}

<main id="main" class="main h-full" data-taxi>
  <div class="grid grid-cols-12 h-full">
    <div class="col-span-7 h-full">
      @php
        if ( ! is_user_logged_in() ) {
          $args = [
            'redirect' => admin_url(), // redirect to admin dashboard.
            'form_id' => 'custom_loginform',
            'label_username' => __( 'Username:' ),
            'label_password' => __( 'Password:' ),
            'label_remember' => __( 'Remember Me' ),
            'label_log_in' => __( 'Log Me In' ),
            'remember' => true
          ];
          wp_login_form( $args );
        }
      @endphp
    </div>
    <div class="col-span-5 h-full"></div>
  </div>
</main>