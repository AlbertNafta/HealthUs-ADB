$(document).ready(function () {
    const step = $(".step");
    // let step = document.getElementsByClassName("step");
    let prevBtn = document.getElementById('prev-btn');
    let nextBtn = document.getElementById('next-btn');
    let submitBtn = document.getElementById('submit-btn');

    const confirm = ["","","","",""]; 
    const id = ["","","","","","",""];
    let hospitalID = '';

    // let d = new Date();
    // let options = { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' };
    // d = d.toLocaleString('en-US', options);
    // console.log(d);


    function getCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
    }

    function listDatesGroupedByDay(startDate, numberOfDays) {
        const groupedDates = [[], [], [], [], [], [], []]; // Initialize an array for each day of the week
        const currentDate = new Date(startDate);
      
        for (let i = 0; i < numberOfDays; i++) {
          const dayOfWeek = currentDate.getDay();
          groupedDates[dayOfWeek].push(new Date(currentDate));
          currentDate.setDate(currentDate.getDate() + 1);
        }
      
        return groupedDates;
    }
    // Generate Profile

    function htmlCodeStep1(data) {
        step.eq(0).append($(`
            <h4>Select a Medical Profile that you want to have a healthcare appointment</h4>
                <div class="form-check ps-0 q-box scroll" id="question-1"></div>
        `));

        const block = $("#question-1");
        data.forEach( function(profile, index) {
            let D = new Date(profile.birth);
            const options = {month: 'long', day: 'numeric', year: 'numeric' };
            D = D.toLocaleString('en-US', options);
            const item = $(`
            <div class="q-box__question q-option">
                <input class="form-check-input question__input" id="ques1-${index+1}" name="q_1"
                    type="radio" value="${profile.profileID}|${profile.name}">
                <label class="form-check-label question__label" for="ques1-${index+1}">
                    <div class="container-info" id="profile-name">
                        <p>
                            <span><i class="fa fa-solid fa-circle-user"></i></span>
                            <span>name</span>
                        </p>
                        <span class="card-text" style="font-weight: 900; font-size: 130%;">${profile.name}</span>
                    </div>
                    <div class="container-info">
                        <p>
                            <span><i class="fa fa-solid fa-cake-candles"></i></span>
                            <span>birthday</span>
                        </p>
                        <span class="card-text">${D}</span>
                    </div>
                    <div class="container-info">
                        <p>
                            <span><i class="fa fa-solid fa-mobile"></i></span>
                            <span>phone</span>
                        </p>
                        <span class="card-text">${profile.phone}</span>
                    </div>
                    <div class="container-info">
                        <p>
                            <span><i class="fa fa-solid fa-envelope"></i></span>
                            <span>gmail</span>
                        </p>
                        <span class="card-text">${profile.email}</span>
                    </div>
                </label>
            </div>    
            `)
            block.append(item);
        });
    }
    // Generate Hospital
    function htmlcodeStep2(data){
        step.eq(1).append($(`<h4>Select a Hospital you need a Healthcare Service</h4>
        <div class="form-check ps-0 q-box scroll" id="question-2">`))

        const block = $("#question-2");

        data.forEach(function(hospital, index){
            const item = $(`
            <div class="q-box__question">
                <input class="form-check-input question__input" id="ques2-${index+1}" name="q_2"
                    type="radio" value="${hospital.hospitalID}|${hospital.name}">
                <label class="form-check-label question__label" for="ques2-${index+1}">
                    <div class="container-hospital">
                        <span>
                            <img src="${hospital.avatar}" alt=""
                            style="max-width: 50px; max-height: 50px; width: auto; height: auto;">
                        </span>
                        <div style="margin-left: 10px;">
                            <p style="margin-bottom: 0;">${hospital.name}</p>
                            <p style="margin-bottom: 0; color: #716969;">${hospital.location}</p>
                        </div>    
                    </div>
                </label>
            </div>
            `)

            block.append(item);
        });
    }
    // Generate Specialist
    function htmlCodeStep3(pickedID){
        hospitalID = pickedID;
        step.eq(2).empty();
        step.eq(2).append($(`<h4>Select A Specialist (which relate to your health issue)</h4>
        <div class="form-check ps-0 q-box scroll" id="question-3">`))

        const block = $("#question-3");

        fetch('/getSpecbyHosID', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ pickedID })
        })
        .then(res => res.json())
        .then(data => {
            // console.log(data);
            data.items.forEach(function(specialist, index){
                const item = $(`
                <div class="q-box__question">
                    <input class="form-check-input question__input" id="ques3-${index+1}" name="q_3"
                        type="radio" value="${specialist.specName}|${(specialist.specName).toUpperCase()}">
                    <label class="form-check-label question__label" for="ques3-${index+1}">${(specialist.specName).toUpperCase()}</label>
                </div>
                `)
                block.append(item);

            })
        })
        .catch(err => console.log(err));
    }
    // Generate Doctor 
    function htmlCodeStep4(pickedID){
        step.eq(3).empty();
        step.eq(3).append($(`<h4>Select A Doctor you want</h4>
        <div class="form-check ps-0 q-box scroll" id="question-4">`))

        const block = $("#question-4");

        // console.log(hospitalID);
        // console.log(pickedID);

        fetch('/getDoctorbySpec', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ hospitalID, pickedID})
        })
        .then(res => res.json())
        .then(data => {
            data.items.forEach(function(doctor, index){
                let genderS = 'MALE';
                if(doctor.gender)
                    genderS = "FEMALE";
                const item = $(`
                <div class="q-box__question q-option">
                    <input class="form-check-input question__input" id="ques4-${index+1}" name="q_4"
                        type="radio" value="${doctor.doctorID}|${doctor.name}">
                    <label class="form-check-label question__label" for="ques4-${index+1}">
                        <div class="container-info" style="width: 406.8px;" id="profile-name">
                            <p>
                                <span><i class="fa-solid fa-user-doctor"></i></span>
                                <span>Doctor</span>
                            </p>
                            <span class="card-text" style="font-weight: 900; font-size: 130%;">${doctor.name}</span>
                        </div>
                        <div class="container-info">
                            <p>
                                <span><i class="fa-solid fa-venus-mars"></i></span>
                                <span>Gender</span>
                            </p>
                            <span class="card-text">${genderS}</span>
                        </div>
                        <div class="container-info">
                            <p>
                                <span><i class="fa-solid fa-stethoscope"></i></span>
                                <span>Specialist</span>
                            </p>
                            <span class="card-text">${doctor.specialist}</span>
                        </div>
                        <div class="container-info">
                            <p>
                                <span><i class="fa-regular fa-calendar"></i></span>
                                <span>Experience</span>
                            </p>
                            <span class="card-text">${doctor.yearExp} years</span>
                        </div>
                    </label>
                </div>
                `);
                block.append(item);
            })
        })
        .catch(err => console.log(err));
    }

    function htmlCodeStep5(pickedID){
        step.eq(4).empty();
        step.eq(4).append($(`<h4>Select a Date for the Appointment (which is the work shift of your chosen  in the next 7 days.)</h4>
        <div class="form-check ps-0 q-box scroll" id="question-5">`))

        const block = $("#question-5");

        // generate 7 days from the current day;
        const currentDate = new Date(); // Your starting date
        const numberOfDays = 7; // Number of days you want to list
      
        const groupedDates = listDatesGroupedByDay(currentDate, numberOfDays);
        // console.log(groupedDates);

        fetch('/getScheofDoc', {
            method: 'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({pickedID})
        })
        .then(res => res.json())
        .then(data => {
            data.items.forEach(function(schedule, index){
                const date = Number(String(schedule)[0]);
                const shift = schedule % 10;
                let shiftStr = '';

                switch(shift){
                    case 1:
                        shiftStr = '7:00 - 9:00';
                        break;
                    case 2:
                        shiftStr = '9:00 - 11:00';
                        break;
                    case 3:
                        shiftStr = '13:00 - 15:00';
                        break;
                    case 4:
                        shiftStr = '15:00 - 17:00';
                        break;
                    default:
                        break;
                }
                 
                let D = groupedDates[date-1];
                const options = { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' };
                D = D.toLocaleString('en-US', options);
                const sche = shiftStr + ' ' + D;

                const item = $(`
                <div class="q-box__question">
                    <input class="form-check-input question__input" id="ques5-${index+1}" name="q_5"
                        type="radio" value="${groupedDates[date-1]}|${sche}|${shift}">
                    <label class="form-check-label question__label" for="ques5-${index+1}">${sche}</label>
                </div>
                `);
                block.append(item);
            })
        })
        .catch(err => console.log(err));
    }

    function htmlCodeStep6(){
        step.eq(5).empty();
        step.eq(5).append($(`
        <div class="mt-1">
            <div class="closing-text">  
                <h4 style="margin-bottom: 0;">IT'S DONE !!!</h4>
                <p style="margin-bottom: 0;">Please check again your appointment information before click SUBMIT button to finish
                    making an appointment</p>
                <p style="margin-bottom: 0;">Thank you for using our service</p>
            </div>
        </div>
        <div class="q-box__question q-option">
            <label class="form-check-label question__label confirm" style="padding-left: 20px">
                <div class="container-info">
                    <p>
                        <span><i class="fa fa-solid fa-circle-user"></i></span>
                        <span>Patient Name</span>
                    </p>
                    <span class="card-text">${confirm[0]}</span>
                </div>
                <div class="container-info">
                    <p>
                        <span><i class="fa-solid fa-hospital"></i></span>
                        <span>Hospital</span>
                    </p>
                    <span class="card-text">${confirm[1]}</span>
                </div>
                <div class="container-info">
                    <p>
                        <span><i class="fa-solid fa-stethoscope"></i></span>
                        <span>Specialist</span>
                    </p>
                    <span class="card-text">${confirm[2]}</span>
                </div>
                <div class="container-info">
                    <p>
                        <span><i class="fa-solid fa-user-doctor"></i></span>
                        <span>Doctor</span>
                    </p>
                    <span class="card-text">${confirm[3]}</span>
                </div>
                <div class="container-info">
                    <p>
                        <span><i class="fa-regular fa-calendar"></i></span>
                        <span>Date</span>
                    </p>
                    <span class="card-text">${confirm[4]}</span>
                </div>
            </label>
        </div>
        `));
    }

    function getPickedID(curStep){
        let selectedValue = $("input[name='q_" + (curStep+1) + "']:checked").val();
        selectedValue = selectedValue.split("|");

        id[curStep] = selectedValue[0];
        confirm[curStep] = selectedValue[1];
        if(curStep == 4){
            id[curStep + 1] = selectedValue[2];
        }
        return selectedValue[0];
    }

    

    const sessionID = getCookie('sessionID');
    console.log('sid: ', sessionID);

    let username = '';
    let user_id = '';

    // Get username asynchronously
    fetch('/getUsn', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${sessionID}`
        }
    })
    .then(res => res.json())
    .then(data => {
        username = data.session.user.username;
        console.log('username: ', username);

        // Get user_id / patID using the retrieved username
        return fetch('/getID', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username })
        });
    })
    .then(res => res.json())
    .then(data => {
        user_id = data.id;
        id[6] = user_id;
        console.log('user_id: ', user_id);
        // Get the medical profile of account
        return fetch('/getMedPro', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ user_id })
        })
            .then(res => res.json())
            .then(data => {
                htmlCodeStep1(data.profiles);
            })
    })
    .catch(err => console.log(err));

    fetch('/getHos',{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${sessionID}`
        }
    })
    .then(res => res.json())
    .then(data => {
        htmlcodeStep2(data.items);
    })
    .catch(err => console.log(err));

    let current_step = 0;
    let stepCount = 5
    step[current_step].classList.add('d-block');
    if (current_step == 0) {
        prevBtn.classList.add('d-none');
        submitBtn.classList.add('d-none');
        nextBtn.classList.add('d-inline-block');
    }

    const progress = (value) => {
        document.getElementsByClassName('progress-bar')[0].style.width = `${value}%`;
    }

    nextBtn.addEventListener('click', () => {
        // console.log(1)
        // const selectedValue = $("input[name='q_1']:checked").val();
        // console.log("Selected value:", selectedValue);
        current_step++;
        let previous_step = current_step - 1;
        
        let pickedID = getPickedID(previous_step);
        console.log(pickedID);
        // console.log(confirm);
        // console.log(id);

        switch(current_step){
            case 2: // Choose specialist
                htmlCodeStep3(pickedID);
                break;
            case 3: // Choose doctor
                htmlCodeStep4(pickedID);
                break;
            case 4: // Choose Date
                htmlCodeStep5(pickedID);
                break;
            case 5: // confirm
                htmlCodeStep6();
                break;
            default:
                break;
        }

        if ((current_step > 0) && (current_step <= stepCount)) {
            prevBtn.classList.remove('d-none');
            prevBtn.classList.add('d-inline-block');
            step[current_step].classList.remove('d-none');
            step[current_step].classList.add('d-block');
            step[previous_step].classList.remove('d-block');
            step[previous_step].classList.add('d-none');
            if (current_step == stepCount) {
                submitBtn.classList.remove('d-none');
                submitBtn.classList.add('d-inline-block');
                nextBtn.classList.remove('d-inline-block');
                nextBtn.classList.add('d-none');
            }
        }
        progress((100 / stepCount) * current_step);
    });


    prevBtn.addEventListener('click', () => {
        if (current_step > 0) {
            current_step--;
            let previous_step = current_step + 1;
            prevBtn.classList.add('d-none');
            prevBtn.classList.add('d-inline-block');
            step[current_step].classList.remove('d-none');
            step[current_step].classList.add('d-block')
            step[previous_step].classList.remove('d-block');
            step[previous_step].classList.add('d-none');
            if (current_step < stepCount) {
                submitBtn.classList.remove('d-inline-block');
                submitBtn.classList.add('d-none');
                nextBtn.classList.remove('d-none');
                nextBtn.classList.add('d-inline-block');
                prevBtn.classList.remove('d-none');
                prevBtn.classList.add('d-inline-block');
            }
        }

        if (current_step == 0) {
            prevBtn.classList.remove('d-inline-block');
            prevBtn.classList.add('d-none');
        }
        progress((100 / stepCount) * current_step);
    });

    submitBtn.addEventListener('click', () => {
        fetch('/addAppointment', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({id})
        })
        .then(res => {
            if (res.redirected && res.status === 200) {
                window.location.href = res.url;
            }
        })
        console.log("clicked");
    });
});

