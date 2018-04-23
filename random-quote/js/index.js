$(document).ready(function () {
  var tweetContent;
  $("#get-another-quote-button").on("click", function (e) {
    e.preventDefault();
    $.ajax({
      url: "https://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1",
      success: function success(data) {
        var post = data.shift();
        tweetContent = post.content;
        tweetContent = tweetContent.slice(3, tweetContent.length - 5);
        console.log(tweetContent);
        document.getElementById("quote-title").innerHTML = post.title;
        document.getElementById("quote-content").innerHTML = post.content;
      },
      cache: false
    });
  });
  document.getElementById("tweet-button").addEventListener("click", function () {
    window.open("https://twitter.com/share?text=" + tweetContent);
  });
});