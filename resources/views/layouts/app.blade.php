<a class="sr-only focus:not-sr-only" href="#main">
  {{ __('Skip to content') }}
</a>

@include('sections.header')

  @include('partials.grid')

  <main id="main" class="main" data-taxi>
    @yield('content')
  </main>

  {{-- @hasSection('sidebar')
    <aside class="sidebar">
      @yield('sidebar')
    </aside>
  @endif --}}

  {{-- <div class="panel"><div class="subpanel"></div></div> --}}

@include('sections.footer')
