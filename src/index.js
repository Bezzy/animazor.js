let top_margin = 48;

let job_list_el =  document.getElementById("job_listing");

let jobs = document.getElementsByClassName("job");
let filter_btn_el = document.getElementsByClassName("filter_btn");

let tag = document.getElementById("tag");

job_list_h = job_list_el.style.height = `${jobs.length * (jobs[0].getBoundingClientRect().height + top_margin)}px`;
console.log(job_list_h);


let filter_arr = [];

// NOTE(): Initial positioning of the elements.
for (let i = 0; i < jobs.length; i++) {
    let job = jobs[i];
    let job_h = jobs[i].getBoundingClientRect().height;
    job.position = (top_margin * (i + 1)) + (job_h * i);
    job.delta = 0;
    job.style.transform = `translate3d(0, ${job.position}px, 0)`;
    job.done_animation = true;

    job.visible = true;
    job.visible_animation_done = true;
    job.opacity =  1;
}


function filter_anime() {
    for (let i = 0; i < jobs.length; i++) {
        let job = jobs[i];
        let speed = (job.initial_dt / 60) * 2;
        if (job.delta > 0) {
            job.delta -= speed;
            console.log("Loggé");
            job.style.transform = `translate3d(0, ${job.old_position -= speed}px, 0)`;
        }
        else
            job.done_animation = true;
    }

    let stop_animation =  true;
    for (let i = 0; i < jobs.length; i++) {
        if (jobs[i].done_animation == true) {
            continue;
        } else {stop_animation = false}
    }
    
    if (!stop_animation) {
        requestAnimationFrame(function() {
            filter_anime();
        });
    } else {

    }

}

function visible_animation() {
    for (let i = 0; i < jobs.length; i++) {
        let job = jobs[i];
        let speed = 0.1;
        if (job.visible === false)  {
            if (job.opacity > 0) {
                job.opacity -= speed;
                job.style.opacity = job.opacity;
                job.visible_animation_done = false;
         
            }
            else
                job.visible_animation_done = true;
        }
    }

    let stop_animation =  true;
    for (let i = 0; i < jobs.length; i++) {
        if (jobs[i].visible_animation_done == true) {
            continue;
        } else {stop_animation = false}
    }
    
    if (!stop_animation) {
        requestAnimationFrame(function() {
            visible_animation();
        });
    }
    else  {
        requestAnimationFrame(function() {
            filter_anime();
        });
    }
}


for (let i = 0; i < filter_btn_el.length; i++) {
    filter_btn_el[i].selected = false;
    filter_btn_el[i].addEventListener("click", function(e) {
        e.target.selected === false ? e.target.selected = true : e.target.selected  = false;
        if (e.target.selected == true) {
            e.target.style.backgroundColor =  "#FDE3A7";
        } else
            e.target.style.backgroundColor =  "white";

        for (let i = 0; i < jobs.length; i++) {
            console.log(jobs[i].classList.contains(e.target.innerText));
            if (!jobs[i].classList.contains(e.target.innerText)) {
                jobs[i].visible =  false;
                jobs[i].visible_animation_done = false;

                jobs[i].classList.add("dp-none");
            }
        }

        let j = 0;
        for (let i = 0; i < jobs.length; i++) {
            if (jobs[i].classList.contains("dp-none")) {
                continue;
            }
            let job = jobs[i];
            job.done_animation = false;
            let job_h = jobs[i].getBoundingClientRect().height;
            job.old_position = job.position;
            job.position = (top_margin * (j + 1)) + (job_h * j);

            job.delta = Math.abs(job.position - job.old_position);
            job.initial_dt = job.delta;

            j++;
        }

        requestAnimationFrame(function() {
            visible_animation();
        });
    });
}