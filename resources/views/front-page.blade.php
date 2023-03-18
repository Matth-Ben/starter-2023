@extends('layouts.app')

@section('content')
  <div data-taxi-view>
    <div class="home">
      <div class="container">
        <section class="title">
          <h1 class="lg:text-[15rem] leading-none">
            <span class="name inline-grid lg:w-5/6 text-[#545454]">/Matthias <span class="ml-auto">Benoit</span></span>
            _Creative <span>My work</span> web
            <span>/developer</span>
          </h1>
        </section>
        <section class="info no-container lg:h-screen">
          <div class="grid grid-cols-12 h-full gap-4">
            <div class="col-span-12 lg:col-span-6 order-2 lg:order-1">
              <div class="info-card h-full bg-white rounded-[2rem] p-10">
                <div class="info-card__content flex flex-col justify-between h-full">
                  <div class="info-card__text">
                    <h2 class="text-black random-letter">Hi! I'm Ilja van Eck. I work with people from all over the world to create tailor-made Webflow experiences and websites.</h2>
                  </div>
                  <div class="info-card__button mt-10">
                    @include('elements.button')
                  </div> 
                </div>
              </div>
            </div>
            <div class="col-span-12 lg:col-span-6 order-1 lg:order-2">
              <div class="info-thumbnail h-full rounded-[2rem] overflow-hidden">
                @include('elements.image')
              </div>
            </div>
          </div>
        </section>
        <section class="about">
          <div class="grid grid-cols-12">
            <div class="col-span-12 lg:col-span-4">
              <h2 class="about__title random-letter">About</h2>
            </div>
            <div class="col-span-12 lg:col-span-8">
              <div class="about__text">
                <p class="text-[2rem]">As a creative developer, I focus on both design and development — allowing me to work on projects from concept until the very moment we hit publish. Unique layouts, interactions and great typography is what I focus on when working on websites.</p>
              </div>
            </div>
          </div>
        </section>
        <section class="about-more">
          <div class="grid grid-cols-12 lg:h-screen lg:flex">
            <div class="col-span-12 lg:col-span-7">
              <div class="about__text">
                <p class="text-[2rem]">I've always wanted to create new things, unique experiences, getting into web development changed a lot of things for me, and since then, I try to push my work to new horizons with each project, always putting quality first.</p>
              </div>
            </div>
            <div class="col-span-12 lg:col-span-5 lg:mt-auto">
              <div class="about__text">
                <p class="text-[2rem]">
                  After working 3 years at Boardriders headquarters, I now decide to go freelance to work on new and exciting ideas surrounded by talented people.
                </p>
                <p class="text-[2rem]">
                  For each project I work on, I pay particular attention to the interaction, animations and performance of your site, so that your users enjoy a pleasant experience throughout their visit.
                </p>
                <p class="text-[2rem]">
                  All this is just the beginning, and I can’t wait to push it even further by working with you on your next project.
                </p>
              </div>
            </div>
          </div>
        </section>
        {{-- <section class="media-full">
          @include('components.video')
        </section> --}}
        <section class="services">
          <div class="grid grid-cols-12">
            <div class="col-span-12 lg:col-span-4">
              <h2 class="about__title random-letter">Services</h2>
            </div>
            <div class="col-span-12 lg:col-span-8">
              <div class="grid grid-cols-8 gap-20">
                <div class="col-span-5">
                  <div class="services__item">
                    <h3 class="services__title"><span class="services__number text-[1.2rem] mr-5">01</span>INTERACTION</h3>
                    <div class="services__content mt-5">
                      <p class="text-[2rem]">A pleasant experience for your users goes through the animations and interactions of your project, I spend time to imagine and design them to ensure a smooth and remarkable navigation.</p>
                    </div>
                  </div>
                </div>
                <div class="col-span-5">
                  <div class="services__item">
                    <h3 class="services__title"><span class="services__number text-[1.2rem] mr-5">02</span>PERFORMANCE</h3>
                    <div class="services__content mt-5">
                      <p class="text-[2rem]">A pleasant experience for your users goes through the animations and interactions of your project, I spend time to imagine and design them to ensure a smooth and remarkable navigation.</p>
                    </div>
                  </div>
                </div>
                <div class="col-span-5">
                  <div class="services__item">
                    <h3 class="services__title"><span class="services__number text-[1.2rem] mr-5">03</span>TEAMWORK</h3>
                    <div class="services__content mt-5">
                      <p class="text-[2rem]">A pleasant experience for your users goes through the animations and interactions of your project, I spend time to imagine and design them to ensure a smooth and remarkable navigation.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section class="projects"></section>
        <section class="awards">
          <div class="grid grid-cols-12">
            <div class="col-span-12 lg:col-span-6">
              <h2 class="random-letter">Awards and recognotion</h2>
            </div>
            <div class="col-span-12 lg:col-span-6">
              <p class="text-[2rem]">These awards are the result of a joint effort by everybody involved to create next level digital experiences. Among features on other platforms, here's some of them:</p>
            </div>
          </div>
          <div class="grid grid-cols-12 mt-16">
            <div class="col-span-12 lg:col-span-6"></div>
            <div class="col-span-12 lg:col-span-6">
              <ul class="awards__list">
                <li class="awards__item border-solid border-b-2 border-slate-700 mb-4 pt-4 pb-8">
                  <a href="#" class="awards__item-content flex items-start justify-between text-[1.5rem]">
                    <div class="awards__item-title flex items-center">
                      <div class="awards__svg">
                        <span>{{ display_svg('arrow') }}</span>
                      </div>
                      <div class="awards__content">
                        <div>Awwwards Site of the Day</div>
                        <div class="opacity-60">Benoit Matthias - Portfolio</div>
                      </div>
                    </div>
                    <div class="awards__item-date">2023</div>
                  </a>
                </li>
                <li class="awards__item border-solid border-b-2 border-slate-700 mb-4 pt-4 pb-8">
                  <a href="#" class="awards__item-content flex items-start justify-between text-[1.5rem]">
                    <div class="awards__item-title flex items-center">
                      <div class="awards__svg">
                        <span>{{ display_svg('arrow') }}</span>
                      </div>
                      <div class="awards__content">
                        <div>Awwwards Site of the Day</div>
                        <div class="opacity-60">Benoit Matthias - Portfolio</div>
                      </div>
                    </div>
                    <div class="awards__item-date">2023</div>
                  </a>
                </li>
                <li class="awards__item border-solid border-b-2 border-slate-700 mb-4 pt-4 pb-8">
                  <a href="#" class="awards__item-content flex items-start justify-between text-[1.5rem]">
                    <div class="awards__item-title flex items-center">
                      <div class="awards__svg">
                        <span>{{ display_svg('arrow') }}</span>
                      </div>
                      <div class="awards__content">
                        <div>Awwwards Site of the Day</div>
                        <div class="opacity-60">Benoit Matthias - Portfolio</div>
                      </div>
                    </div>
                    <div class="awards__item-date">2023</div>
                  </a>
                </li>
                <li class="awards__item border-solid border-b-2 border-slate-700 mb-4 pt-4 pb-8">
                  <a href="#" class="awards__item-content flex items-start justify-between text-[1.5rem]">
                    <div class="awards__item-title flex items-center">
                      <div class="awards__svg">
                        <span>{{ display_svg('arrow') }}</span>
                      </div>
                      <div class="awards__content">
                        <div>Awwwards Site of the Day</div>
                        <div class="opacity-60">Benoit Matthias - Portfolio</div>
                      </div>
                    </div>
                    <div class="awards__item-date">2023</div>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </div>
  </div>
@endsection
