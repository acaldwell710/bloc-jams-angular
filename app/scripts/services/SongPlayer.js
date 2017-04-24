(function() {
 function SongPlayer($rootScope, Fixtures) {
     var SongPlayer = {};
     
     /*
     * @desc used to access the songs array in order to get index
     * @type method
     */
     var currentAlbum = Fixtures.getAlbum();
      
    /**
    * @desc Buzz object audio file
    * @type {Object}
    */
     var currentBuzzObject = null;
     
    /**
    * @function setSong
    * @desc Stops currently playing song and loads new audio file as currentBuzzObject
    * @param {Object} song
    */
     var setSong = function(song) {
         if (currentBuzzObject) {
             currentBuzzObject.stop();
             SongPlayer.currentSong.playing = null;
         }
         currentBuzzObject = new buzz.sound(song.audioUrl, {
             formats: ['mp3'],
             preload: true
         });
         
            /*
     * @function/method currentBuzzObject.bind
     * @desc applies time update to current song
     */
     currentBuzzObject.bind('timeupdate', function() {
         $rootScope.$apply(function() {
             SongPlayer.currentTime = currentBuzzObject.getTime();
         });
     });
         
         SongPlayer.currentSong = song;
     };
     
     /*
     * @function playSong
     * @desc this is used to play the current song
     * @param {object} song
     */
     var playSong = function (song) {
         if (currentBuzzObject) {
             currentBuzzObject.play();
             song.playing = true;
         }
         
         SongPlayer.currentSong = song;
     };
     
     /*
     * @function stopSong
     * @desc this is used to stop the current song
     * @param {object} song
     */
     var stopSong = function (song){
         if(currentBuzzObject) {
            currentBuzzObject.stop();
            song.playing = null;
         }
         SongPlayer.currentSong = song;
     };
     
     /**
     * @function getSongIndex
     * @desc used to get index of song array
     * @param {Object} song
     */
     var getSongIndex = function(song) {
        return currentAlbum.songs.indexOf(song);
     };
     
      /**
     * @desc variable that is the currently playing song
     * @type [array]
     */
     SongPlayer.currentSong = null;
     
     /**
     * @desc Current playback time (in seconds) of currently playing song
     * @type {Number}
     */
     SongPlayer.currentTime = null;
     
     /*
     * @function/method SongPlayer.play
     * @desc this method is used determine if the current song is the song that is playing
     * @param {Object} song
     */
     SongPlayer.play = function(song) {
         song = song || SongPlayer.currentSong;
         if (SongPlayer.currentSong !== song) {
             setSong(song);
             playSong(song);
             
             
         }  else if (SongPlayer.currentSong === song) {
             if (currentBuzzObject.isPaused()) {
             currentBuzzObject.play();
             }
         }       
     };
     
     /*
     * @function/method SongPlayer.pause
     * @desc this method is used to pause the current song
     * @param {Object} song
     */
     SongPlayer.pause = function(song) {
         song = song || SongPlayer.currentSong;
         currentBuzzObject.pause();
         song.playing = false;
     };
     
     /*
     * @function/method SongPlayer.previous
     * @desc allows us to get to previous song
     */
     SongPlayer.previous = function() {
         var currentSongIndex = getSongIndex(SongPlayer.currentSong);
         currentSongIndex--;
         
         if (currentSongIndex < 0) {
            stopSong(song);
         } else {
            var song = currentAlbum.songs[currentSongIndex];
            setSong(song);
            playSong(song);
         }
     };
     
      /*
     * @function/method SongPlayer.next
     * @desc allows us to get to next song
     */
     SongPlayer.next = function() {
         var currentSongIndex = getSongIndex(SongPlayer.currentSong);
         currentSongIndex++;
         
         if (currentSongIndex >= currentAlbum.songs.length) {
             currentSongIndex = 0;
         } else {
         var song = currentAlbum.songs[currentSongIndex];
            setSong(song);
            playSong(song);
         }
     };
     
     /**
     * @function setCurrentTime
     * @desc Set current time (in seconds) of currently playing song
     * @param {Number} time
     */
     SongPlayer.setCurrentTime = function(time) {
         if (currentBuzzObject) {
             currentBuzzObject.setTime(time);
         }
     };
        
     return SongPlayer;
 
 }
 
     angular
        .module('blocJams')
        .factory('SongPlayer', ['$rootScope', 'Fixtures', SongPlayer]);
})();