/*----- constants -----*/
//HTML constants for review form
const updateFormPart1 = `<form id="updateReview" action="/reviews/`;
//in between here we will add the ice cream ID
const updateFormPart2 = `/update?_method=PUT" method="POST">
                    <textarea rows="3" cols="48" name="content">`;
//in between here we will add the review content
const updateFormPart3 = `</textarea>
                        <br>
                        <input type="hidden" name="reviewedBy" value="<%= user._id %>">
                        <button class="cancel-update">Cancel</button>
                        <input type="submit" id="addReviewBtn" value="Update Review">
                    </form>`;

//HTML constants for delete div
const deleteDivPart1 = `<div id="delete-review"> 
                    <form action="/reviews/`
//in between here we will add the ice cream ID
const deleteDivPart2 = `?_method=DELETE" method="POST"> 
                        <button id="just-review" type="submit">Delete Review</button> 
                    </form>
                    <form action="/reviews/`
//in between here we will add the ice cream ID
const deleteDivPart3 =`/rating?_method=DELETE" method="POST">
                        <button id="both-rs" type="submit">Delete Rating + Review</button>
                    </form>
                        <button class="cancel-del">Cancel</button> 
                </div>`;

// window width constant
const windowWidth = window.matchMedia("(max-width: 600px)");


/*----- app's state (variables) -----*/
let removedReview, $iceCreamBox;

// keep track of swiper instances to destroy later
let swiper;

/*----- cached element references -----*/
const $selector = $('#ice-cream-flex');

/*----- event listeners -----*/
$selector.click(handleClick);
windowWidth.addListener(checkWindowWidth) // Attach listener function on state changes


/*----- functions -----*/

//handle click on the ice cream items
function handleClick(e) {
    if ($(e.target).hasClass("edit-link")) { //if click on "Edit" link on review box
        showTextArea(e); //show text area for user to edit answer
    } else if ($(e.target).hasClass("cancel-update")) { //if click on cancel after wanting to edit review
        cancelUpdate(e); //revert back
    } else if($(e.target).text() === "X") { //if click on X button above review
        deleteReview(e); //show buttons to delete review
    } else if ($(e.target).hasClass("cancel-del")) { //if click on "Cancel" within delete div
        $('#delete-review').remove(); //remove any delete overlays that may have been left
    };
};

function showTextArea(e) {
    e.preventDefault();
    //remove any delete overlays that may have been left
    $('#delete-review').remove();
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
    //we interject the ice cream ID into the form
    $iceCreamBox.append(updateFormPart1+iceCreamID+updateFormPart2+content+updateFormPart3);
};

function cancelUpdate(e) {
    e.preventDefault();
    //create element reference to the review update form
    let $updateForm = $(e.target.parentElement);
    //remove it
    $updateForm.remove();
    //append the removed review back into view
    $iceCreamBox.append(removedReview);
};

function deleteReview(e) {
    e.preventDefault();
    //create element reference for the review div
    let $reviewBoxForDel = $(e.target.parentElement.parentElement);
    //grab ice cream object ID, which will always be the specified 24 characters
    let iceCreamID = $reviewBoxForDel.prop('outerHTML').substring(28, 52);
    //append div with delete forms and a cancel button
    //we interject the ice cream ID into those forms
    $reviewBoxForDel.append(deleteDivPart1+iceCreamID+deleteDivPart2+iceCreamID+deleteDivPart3);
};

//window width changes and media query is triggered
function checkWindowWidth(windowWidth) {
    if (windowWidth.matches) { // If media query matches
        //initialize swiper
        swiper = new Swiper('.swiper-container', {
            cssMode: true,
            navigation: {
              nextEl: '.swiper-button-next',
              prevEl: '.swiper-button-prev',
            },
            pagination: {
              el: '.swiper-pagination'
            },
            mousewheel: true,
            keyboard: true,
          })
        } else if ($selector.is('#ice-cream-flex')){
            //destroy swiper instance when window gets larger
            if ( swiper !== undefined ) swiper.destroy( true, true );
        }
};

//check window width on load
checkWindowWidth(windowWidth);



