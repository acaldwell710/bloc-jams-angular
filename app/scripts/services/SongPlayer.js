(function() {
 function SongPlayer() {
     var SongPlayer = {};

     /**
     * @desc variable that is the currently playing song
     * @type [array]
     */
     var currentSong = null;
      
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
             currentSong.playing = null;
         }
         
         currentBuzzObject = new buzz.sound(song.audioUrl, {
             formats: ['mp3'],
             preload: true
         });
         
         currentSong = song;
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
         
         currentSong = song;
     };
     
     /*
     * @function/method SongPlayer.play
     * @desc this method is used determine if the current song is the song that is playing
     * @param {Object} song
     */
     SongPlayer.play = function(song) {
         if (currentSong !== song) {
             setSong(song);
             playSong(song);
             
             
         }  else if (currentSong === song) {
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
         currentBuzzObject.pause();
         song.playing = false;
     };
        
     return SongPlayer;
 
 }
 
     angular
        .module('blocJams')
        .factory('SongPlayer', SongPlayer);
})();