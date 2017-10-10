$(document).ready(function() {
  const randomURL = "https://en.wikipedia.org/wiki/Special:Random";
  const apiURL = "https://en.wikipedia.org/w/api.php";
  const enterSearch = "<h3 class='text-center'>Enter search above</h3>";
  const noResultsFound = "<h3>No results found</h3>";
  
  $("#results").append(enterSearch);
  
  $("#random-btn").click(function() {
    // open a random article in a new tab
    window.open(randomURL);
  });
  
  $("#search-btn").click(function() {
    // clear list of results
    $("#results").empty();
    // TODO: Add loading animation here
    // Build API url with params
    var paramsObject = {
      action: "query",
      format: "json",
      list: "search",
      srsearch: $("#searchBar").val()
    };
    
    // return data from API
    $.ajax({
      url: apiURL,
      data: paramsObject,
      dataType: "jsonp",
      success: function(data) {
        if (data.error) {
          $("#results").append(enterSearch);
          return;
        }
        var apiResults = data.query.search;
        console.log(apiResults);
        
        var results = "";
        
        if (apiResults.length == 0) {
          results = noResultsFound;
        } else {
          for(i = 0; i < apiResults.length; i++) {
            results = results.concat(apiDataToHTML(apiResults[i]));
          }
        }
        $("#results").append(results);
      },
      error: function(jqXHR, status, error) {
        console.log("error encountered");
        console.log(error + ": " + status);
      }
    });
  });
  // function to return a new result div with params
  // result: one element of the search array returned by the wikipedia API
  function apiDataToHTML(result) {
    var htmlString = `
  <a href="https://en.wikipedia.org/?curid=${result.pageid}">
    <div class='panel panel-default searchresult'>
      <div class='panel-heading'>
        <h3 class='panel-title'>${result.title}</h2>
      </div>
      <div class='panel-body'>${result.snippet}</div>
    </div>
  </a>`;
    return htmlString;
  };
});