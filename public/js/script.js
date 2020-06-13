/*----- constants -----*/
const formPart1 = `<form action="/reviews/`;
const formPart2 = `?_method=PUT" method="POST">
<textarea rows="3" cols="48" name="content">`;
const formPart3 = `</textarea>
<input type="hidden" name="reviewedBy" value="<%= user._id %>">
<input type="submit" id="addReviewBtn" value="Update Review"></form>`;


/*----- app's state (variables) -----*/

/*----- cached element references -----*/
const $editReview = $('#edit-review');
const $reviewBox = $('#review-box');
const $iceCreamBox = $('#individual-ice-cream');
const content = $('#content').text();

/*----- event listeners -----*/
$editReview.click(showTextArea);

/*----- functions -----*/
function showTextArea(e) {
    e.preventDefault();
    console.log($reviewBox.prop('outerHTML'));
    let iceCreamID = $reviewBox.prop('outerHTML').substring(28, 52);
    console.log(iceCreamID);
    $reviewBox.remove();
    $iceCreamBox.append(formPart1+iceCreamID+formPart2+content+formPart3);
};