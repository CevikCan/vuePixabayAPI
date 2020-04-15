<template>
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
      <router-link tag="a" class="navbar-brand" to="/">
              PHOTO & VIDEO SEARCH
      </router-link>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>

  <div class="collapse navbar-collapse" id="navbarColor01">
    <ul class="navbar-nav mr-auto">
      <router-link to="/photo-search" tag="li" class="nav-item">
        <a class="nav-link">Photo Search</a>
      </router-link>
     <router-link to="/video-search" tag="li" class="nav-item">
        <a class="nav-link">Video Search</a>
     </router-link>
     <router-link to="/like-list" tag="li" class="nav-item">
        <a class="nav-link">Like List</a>
     </router-link>     
    </ul>
  </div>
</nav>
</template>
