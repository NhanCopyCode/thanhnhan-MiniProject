

const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)
const appContent = $('.app__content')

// Render UI
// Get value from checkbox
// Add radar chart
// Add value from checkbox into radar chart

const app = {
    config: false,
    numOfCourage: 0,
    numOfCommiment: 0,
    numOfFocus: 0,
    numOfOpenness: 0,
    numOfRespect: 0,
    lableArray: [],
    numArray: [],
    data : [
        {
            heading: 'Courage',
            class: 'courage',
            options: [
                'I work on the next highest priority Product Backlog Item (I do not cherry pick the work I pick up in the Sprint)',
                'If I see something that is wrong with what I\'m being asked to do, I will say so.',
                'I will question & reproach my team members if I feel that they are doing something wrong.',
                'Regardless of the person talking, I will correct them if I believe that they are incorrect.',
                'I will stand firm if I believe I am right, even if I\'m in the minority within the group.'
            ],
            icon: '<i class="fa-regular fa-thumbs-up icon"></i>'
        },
        {
            heading: 'Commitment',
            class: 'commitment',
            options: [
                'I always know what the sprint goal is and how my work supports it.',
                'I do everything I can to ensure we achieve the goals of the sprint.',
                'In my current team, I have never thought of taking a sick day to avoid going into work.',
                'I always arrive on time for the events, my colleagues never have to wait for me to start the event.',
                'I know what it means to say that an item is done, i.e. I know the criteria that meets our Definition of Done.'
            ],
            icon: '<i class="fa-regular fa-handshake icon"></i>'
        },
        {
            heading: 'Focus',
            class: 'focus',
            options: [
                'Whilst working on a story I do not get distracted.',
                'If I am not enjoying the work in a story I still give it the attention it needs.',
                'When enjoying working on a story I will not over work a story just to prolong it.',
                'I do not procrastinate when working on a story.',
                'As soon as the story is ready to move into a new state, I will tell my colleagues and either hand it over or ensure that they know it is ready to pick up.'
            ],
            icon: '<i class="fa-solid fa-person-rays icon"></i>'
        },
        {
            heading: 'Openness',
            class: 'openness',
            options: [
                'I do not shy away from telling difficult news to team members and stakeholders',
                'I do not hide away difficult issues in the hope that they will sort themselves out.',
                'If something / someone is annoying me I will address it / tell them.',
                'My colleagues can judge what state of mind I\'m in, I can share my feelings with my them.',
                'I always say the true state of an item, and do not over/under play it.'
            ],
            icon: '<i class="fa-regular fa-face-laugh-squint icon"></i>'
        },
        {
            heading: 'Respect',
            class: 'respect',
            options: [
                'I listen with equal intensity regardless of who is talking.',
                'When listening to people I never talk over them.',
                'I value everyone\'s opinion equally.',
                'I am never concerned who works on what item in the backlog.',
                'I feel that my opinion is respected and that I have an equal say in the team.'
            ],
            icon: '<i class="fa-solid fa-people-arrows icon"></i>'
        }
    ],
    render : function() {
        var htmls = this.data.map(function(dataItem, index) {
            return `<div id= ${dataItem.class}>
            <div class="group-heading">
                <h2 class="heading">${dataItem.heading}</h2>
                ${dataItem.icon}
            </div>
            ${
                dataItem.options.map(function(option, index) {
                    return `<ul class="list-item">
                        <li class="item">
                            <input id = "${dataItem.class}__${index}" type="checkbox" class="${dataItem.class}__choice">
                            <label for="${dataItem.class}__${index}">${option}</label>
                        </li>
                    </ul>`
                }).join('')
            }`
        })

        appContent.innerHTML = htmls.join('')

    },
    getValueCheckbox: function() {
        const _this = this

        const courage = $$('.courage__choice')
        const commitment = $$('.commitment__choice')
        const focus = $$('.focus__choice')
        const openness = $$('.openness__choice')
        const respect = $$('.respect__choice')

        const myArray = []
        
       
           
        courage.forEach(function(checkbox) {   
            if(checkbox.checked) {
                _this.numOfCourage++;
            }
        })

        commitment.forEach(function(checkbox) {   
            if(checkbox.checked) {
                _this.numOfCommiment++;
            }
        })

        focus.forEach(function(checkbox) {   
            if(checkbox.checked) {
                _this.numOfFocus++;
            }
        })

        openness.forEach(function(checkbox) {   
            if(checkbox.checked) {
                _this.numOfOpenness++;
            }
        })

        respect.forEach(function(checkbox) {   
            if(checkbox.checked) {
                _this.numOfRespect++;
            }
        })

        myArray.push(_this.numOfCourage, _this.numOfCommiment, _this.numOfFocus, _this.numOfOpenness, _this.numOfRespect)
        return myArray
    },
    handleResetButton: function() {
        const resetButton = $('.btn--reset')
        
        const courage = $$('.courage__choice')
        const commitment = $$('.commitment__choice')
        const focus = $$('.focus__choice')
        const openness = $$('.openness__choice')
        const respect = $$('.respect__choice')
        resetButton.onclick = function() {
            courage.forEach(function(checkbox) {   
                if(checkbox.checked) {
                   checkbox.checked = false
                }
            })
    
            commitment.forEach(function(checkbox) {   
                if(checkbox.checked) {
                    checkbox.checked = false
                }
            })
    
            focus.forEach(function(checkbox) {   
                if(checkbox.checked) {
                    checkbox.checked = false
                }
            })
    
            openness.forEach(function(checkbox) {   
                if(checkbox.checked) {
                    checkbox.checked = false
                }
            })
    
            respect.forEach(function(checkbox) {   
                if(checkbox.checked) {
                    checkbox.checked = false
                }
            })
        }
    },
    addValueIntoChart: function() {
        const _this = this
        const btnResult = $('.btn--result')
        const chartElement = $('.chart')

        btnResult.onclick = function() {
            //Nếu chart đã có rồi thì xóa nó
            if(_this.config) {
                _this.config.destroy()
            }
            //Tạo một chart mới
            Chart.defaults.font.size = 26;
            const data = {
                labels: _this.getLables(),
                datasets: [{
                    data: _this.getValueCheckbox(),
                    fill: true,
                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                    borderColor: 'rgb(255, 99, 132)',
                    pointBackgroundColor: 'rgb(255, 99, 132)',
                    pointBorderColor: '#fff',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: 'rgb(255, 99, 132)'
                }, 
            ]};
            _this.config = new Chart(chartElement, {
            type: 'radar',
            data: data,
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins:{
                    legend:{
                        display:false,
                    },
                    
                },
                elements: {
                    line: {
                        borderWidth: 3
                    },
                },
                scales: {
                    r: {
                        ticks: {
                            stepSize: 1,
                            beginAtZero: true,
                        },
                        min: 0,
                        max: 5, 
                        pointLabels: {
                            font: {
                                size: 26
                            }
                            }              
                    },
                },
            },
            });
            // Reset lại những value của chart
            _this.resetValueCheckbox()
        }
        
    },
    resetValueCheckbox: function() {
        this.numOfCommiment = 0
        this.numOfCourage = 0
        this.numOfFocus = 0
        this.numOfOpenness = 0
        this.numOfRespect = 0
    },
    reset: function() {
        this.numArray = []
        this.lableArray = []
     
    },
    renderChart: function() {
        const chartElement = $('.chart')
        Chart.defaults.font.size = 26;
        const data = {
            labels: this.getLables(),
            datasets: [{
              data: this.getValueCheckbox(),
              fill: true,
              backgroundColor: 'rgba(255, 99, 132, 0.2)',
              borderColor: 'rgb(255, 99, 132)',
              pointBackgroundColor: 'rgb(255, 99, 132)',
              pointBorderColor: '#fff',
              pointHoverBackgroundColor: '#fff',
              pointHoverBorderColor: 'rgb(255, 99, 132)'
            }, 
        ]};
        const config = new Chart(chartElement, {
        type: 'radar',
        data: data,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins:{
                legend:{
                   display:false,
                },
                
            },
            elements: {
                line: {
                    borderWidth: 3
                },
            },
            scales: {
                r: {
                    ticks: {
                        stepSize: 1,
                        beginAtZero: true,
                    },
                    min: 0,
                    max: 5, 
                    pointLabels: {
                        font: {
                          size: 26
                        }
                      }              
                },
            },
        },
        });
        console.log(config.destroy());
        return config
    },
    getLables: function() {
        const _this = this
        const lableArray = []
        this.data.forEach(function(dataItem) {
            lableArray.push(dataItem.heading)
        })
        return lableArray
    },
    handleScrollToTop: function() {
        const scrollToTopBtn = $('#scrollToTop')
        window.onscroll = function() {scrollFunction()};

        function scrollFunction() {
            if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
                scrollToTopBtn.style.display = "block";
            } else {
                scrollToTopBtn.style.display = "none";
            }
        }

        scrollToTopBtn.onclick = function() {
            window.scrollTo({top: 0, behavior: 'smooth'});
            // document.body.scrollTop = 0;
            // document.documentElement.scrollTop = 0;
        }
       
    },
    start : function() {
        // Render UI
        this.render()

        // Get values from checkbox 
        this.getValueCheckbox()
        
        this.addValueIntoChart()

        this.handleResetButton()

        this.handleScrollToTop()
    },
}

app.start()