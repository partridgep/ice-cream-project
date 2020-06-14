/*----- constants -----*/
//HTML consstants for review form
const formPart1 = `<form id="updateReview" action="/reviews/`;
//in between here we will add the ice cream ID
const formPart2 = `/update?_method=PUT" method="POST">
<textarea rows="3" cols="48" name="content">`;
//in between here we will add the review content
const formPart3 = `</textarea>
<input type="hidden" name="reviewedBy" value="<%= user._id %>">
<button class="cancel">Cancel</button>
<input type="submit" id="addReviewBtn" value="Update Review"></form>`;

/*----- app's state (variables) -----*/
let removedReview, $iceCreamBox;

/*----- cached element references -----*/
const $selector = $('#selector-flex');

/*----- event listeners -----*/
$selector.click(handleClick);

/*----- functions -----*/

//handle click on the ice cream items
function handleClick(e) {
    //if click on "Edit" link on review box
    if ($(e.target).hasClass("edit-link")) {
        showTextArea(e); //show text area for user to edit answer
    } else if ($(e.target).hasClass("cancel")) { //if they click on cancel after wanting to edit review
        cancel(e); //revert back
    };
};

function showTextArea(e) {
    e.preventDefault();
    //create element reference for the review div
    let $reviewBox = $(e.target.parentElement.parentElement);
    //create elemenent reference for removed review in case user cancels and wants to add it back
    removedReview = e.target.parentElement.parentElement.parentElement.outerHTML;
    //create element reference for ice cream div
    $iceCreamBox = $(e.target.closest('#individual-ice-cream'));
    //grab ice cream object ID, which will always be the specified 24 characters
    let iceCreamID = $reviewBox.prop('outerHTML').substring(28, 52);
    //grab the actual content of the review
    const content = $($reviewBox.children()[4]).text();
    //remove the review div
    $reviewBox.remove();
    //append a review form with review content as placeholder
    $iceCreamBox.append(formPart1+iceCreamID+formPart2+content+formPart3);
};

function cancel(e) {
    e.preventDefault();
    //create element reference to the review update form
    let $updateForm = $(e.target.parentElement);
    //remove it
    $updateForm.remove();
    //append the removed review back into view
    $iceCreamBox.append(removedReview);
};