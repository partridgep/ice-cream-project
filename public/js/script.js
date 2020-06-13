/*----- constants -----*/
const formPart1 = `<form action="/reviews/`;
const formPart2 = `/update?_method=PUT" method="POST">
<textarea rows="3" cols="48" name="content">`;
const formPart3 = `</textarea>
<input type="hidden" name="reviewedBy" value="<%= user._id %>">
<input type="submit" id="addReviewBtn" value="Update Review"></form>`;


/*----- app's state (variables) -----*/

/*----- cached element references -----*/
const $editReview = $('#edit-review > a:first-child');

/*----- event listeners -----*/
$editReview.click(showTextArea);

/*----- functions -----*/
function showTextArea(e) {
    e.preventDefault();
    let $reviewBox = $(e.target.parentElement.parentElement);
    console.log($reviewBox.prop('outerHTML'));
    console.log(e.target.closest('#individual-ice-cream'));
    let $iceCreamBox = $(e.target.closest('#individual-ice-cream'));
    let iceCreamID = $reviewBox.prop('outerHTML').substring(28, 52);
    console.log(iceCreamID);
    console.log($reviewBox.children()[4]);
    console.log($($reviewBox.children()[4]).text());

    const content = $($reviewBox.children()[4]).text();
    $reviewBox.remove();
    $iceCreamBox.append(formPart1+iceCreamID+formPart2+content+formPart3);
};