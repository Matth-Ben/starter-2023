@extends('layouts.app')

@section('content')
<div data-taxi-view>
  @while(have_posts()) @php(the_post())
    <a href="/" class="text-white">Return home</a>
    @include('partials.page-header')
    @includeFirst(['partials.content-page', 'partials.content'])
  @endwhile
</div>
@endsection
