document.body.style.border = "5px solid red";

let playerTheater = document.querySelector("div#player-theater-container.style-scope.ytd-watch-flexy");

let commentDisplay = document.createElement("div");
commentDisplay.textContent = "Comments shall live here!";
commentDisplay.style = "color:#fff";

// insert commentDisplay after the playerTheater
playerTheater.insertAdjacentElement("afterend", commentDisplay);
document.addEventListener(
    "scroll",
    function(event) {
        try {
            commentDisplay.innerHTML = "deleted!"; // delete previous comments

            const scrolled = window.scrollY; // Number of pixels the user has scrolled
            if (typeof this.scrollLowest == 'undefined') {
                this.scrollLowest = 0;
            }

            if (scrolled <= this.scrollLowest) {
                return; // there can't be new comments
            } else {
                this.scrollLowest = scrolled;
            }

            // console.log("this.scrollLowest ", this.scrollLowest);

            if (typeof this.lastCommentCount == 'undefined') {
                this.lastCommentCount = 0;
            }

            comments = document.querySelectorAll("ytd-comment-thread-renderer.style-scope");
            if (this.lastCommentCount >= comments.length) {
                return; // no new comments loaded
            } else {
                this.lastCommentCount = comments.length;
            }

            for (let commentCount = 0; commentCount < comments.length; commentCount++) {
                let linkAnchors = comments[commentCount].querySelectorAll("yt-formatted-string#content-text.style-scope.ytd-comment-renderer a.yt-simple-endpoint.style-scope.yt-formatted-string");
                console.log("linkAnchors", typeof linkAnchors, linkAnchors)
                for (let linkAnchorsCount = 0; linkAnchorsCount < linkAnchors.length; linkAnchorsCount++) {
                    let anchorContent = linkAnchors[linkAnchorsCount].textContent;
                    if (anchorContent.length < 4) continue; // can not contain a timestamp

                    // check if anchor contains a timestamp or a link to somewhere else like a website
                    // console.log("anchorContent:", anchorContent, "anchorContent.length:", anchorContent.length);
                    let regex = /(?<!:)(\d{1,2}:){1,2}\d\d/;
                    let matches = anchorContent.match(regex); // match timestamps
                    // test-string:  a f0:00g a f00:00g a f0:0:0g a f0:00:0g a f0:0:00g a f0:00:00g bbb f0:0:0:0g a f0:0:00:0g a f0:0:0:00g a f0:0:00:00g
                    if (matches) {
                        let s = anchorContent.split(":");
                        //console.log("match", anchorContent, "split:", typeof s, s);

                        let second = parseInt(s[s.length - 1]);
                        let minute = parseInt(s[s.length - 2]);
                        let hour = s.length > 2 ? parseInt(s[0]) : 0;

                        let timestamp = ((hour * 60) + minute) * 60 + second;
                        console.log("timestamp", typeof timestamp, timestamp);
                        commentDisplay.insertAdjacentElement("beforeend", comments[commentCount].cloneNode(true));
                    } else {
                        console.log("matches", typeof matches, "no matches in", anchorContent);
                    }
                }
            }
        } catch (error) {
            console.log(error);
        }
    }
);