const categories = {
    sfw: [
        "waifu",
        "neko",
        "shinobu",
        "megumin",
        "bully",
        "cuddle",
        "cry",
        "hug",
        "awoo",
        "kiss",
        "lick",
        "pat",
        "smug",
        "bonk",
        "yeet",
        "blush",
        "smile",
        "wave",
        "highfive",
        "handhold",
        "nom",
        "bite",
        "glomp",
        "slap",
        "kill",
        "kick",
        "happy",
        "wink",
        "poke",
        "dance",
        "cringe"
    ],
    nsfw: [
        "waifu",
        "neko",
        "trap",
        "blowjob"
    ]
}

/**
 * @return {HTMLElement} return HTMLElement
 */
const $_ = (identifier) => document.querySelector(identifier)

const dataList = [
    $_(".search_bar"),
    $_('#value-swf'),
    $_("#value-nswf"),
    $_('.input-categories')
]
const category_options = $_("#category-options")

function updateCategories(cat) {
    category_options.innerHTML = ''
    for(let item of categories[cat]) {
        const opt = document.createElement('option')
        opt.value = item

        category_options.appendChild(opt)
    }
}

function setEvents() {
    for (let item of dataList) {
        item.addEventListener("change", () => getData())
        item.addEventListener("input", () => getData())
    }
}

const display_area = $_(".display-area")

/**
 * 
 * @param {FormData} formUp 
 */
function getData(formUp = null) {
    let formData
    if (formUp === null) {
        const form = document.forms.form_area
        formData = new FormData(form)
    } else {
        formData = formUp
    } 

    let __type = formData.get('filter_value')
    let __categories = formData.get('input-categories') 
    __categories = __categories === '' ? 'waifu' : __categories

    let request_url = `https://api.waifu.pics/${__type}/${__categories}`

    fetch(request_url,{
        method: "GET"
    })
    .then(data => data.json())
    .then(data => {
        display_area.innerHTML = `<img src='${data.url}' alt='Image is loading' onclick="download('${data.url}')">` + display_area.innerHTML
    })
}

function download(url) {
    const a = document.createElement('a')
    // a.setAttribute('href', 'data:application/octet-stream,' + encodeURIComponent(url));
    a.href = "/download?url="+url
    a.target = '_about'
    a.rel = 'noreferrer'
    a.click()
    delete a
}

!function main() {
    setEvents()
    updateCategories('sfw')
    getData()
}()

$_("form").addEventListener("submit", e => {
    e.preventDefault()
})

let intr;

function setIntervalMethod() {
    intr = setInterval(() => {
        let type_list = ['nsfw', 'sfw']
        let filter_value = type_list[Math.ceil(Math.random() * (type_list.length - 1))]
        
        let cat_list = categories[filter_value]
        let input_categories = cat_list[Math.ceil(Math.random() * (cat_list.length - 1))]

        let formData = new FormData()
        formData.append('filter_value', filter_value)
        formData.append('input-categories', input_categories)

        getData(formData)
    }, 10000)
}

$_('button').addEventListener("click", (e) => {
    /**
     * @type {HTMLElement}
     */
    let elem = e.target
    if (elem.classList.contains('active')) {
        elem.className = 'inactive'
        elem.textContent = 'Stop Automatic'
        setIntervalMethod()
    } else {
        elem.className = 'active'
        elem.textContent = 'Get Automatic'
        clearInterval(intr)
    }
})