import { redirect  } from 'next/navigation'
/*
* Before opening a link, turn the page black with a fade-out for 2 seconds 
*/
let isRunning = false;

export const openLink = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, link: string) => {
    if (!isRunning) {
        isRunning = true;
        /*
           * prevent Link to go
           */
        e.preventDefault();

        /*
        * get the cortin up
        */
        const cortin: HTMLElement = document.getElementById("cortin")!;
        cortin.className = "up";

        /*
         * get the cortin down
         */
        setTimeout(() => {
            cortin.className = "down";
        }, 1000);

        /*
        * normalize
        */
        setTimeout(() => {
            cortin.className = "";
        }, 2000);

        /*
        * go to the link
        */
        redirect(link)
    }

}