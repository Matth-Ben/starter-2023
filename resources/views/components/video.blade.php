<div class="c-video">
    <video class="c-video__video" controls>
      <source src="" type="">
      <p>{{ __('Votre navigateur ne prend pas en charge les vidéos HTML5.') }}<a href="">{{ __('Voir la vidéo') }}</a></p>
    </video>
    @if ($data['poster'])
      <div class="c-video__poster">
        @include('elements.image')
        {{-- @include('elements/image', ['data' => $data['poster']]) --}}
        <div class="c-video__play">{{ display_svg('play') }}</div>
      </div>
    @endif
</div>
  