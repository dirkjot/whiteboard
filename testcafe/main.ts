import { Selector,t } from 'testcafe'

const all_boards = [
    'App Transformation',
    'AppTX Leadership',
    'AppTX West',
    'AppTx .NET Practice',
    'AppTx Federal',
    'AppTx PL',
    'AppTx South',
    'Beaverton',
    'Boston',
    'Boulder',
    'CF - London Standup',
    'CF - San Francisco',
    'Chicago Labs',
    'Cork - DATA',
    'Cork - PaaS',
    'Data - Beijing',
    'Data Innovation Labs Standup',
    'Denver Office',
    'Dublin',
    'ED Team Leads',
    'ED West',
    'Greenplum - Palo Alto',
    'Greenplum for Kubernetes',
    'Labs - Atlanta',
    'Labs - Austin',
    'Labs - Berlin',
    'Labs - Dallas',
    'Labs - San Francisco',
    'Labs - Santa Monica',
    'Labs - Seattle',
    'Labs - Singapore',
    'Labs - Sydney',
    'Labs - Sydney',
    'Labs - Tokyo',
    'Labs - Washington, D.C.',
    'London',
    'NE PA Team',
    'NY Office Standup',
    'PA-Federal',
    'PCF Solutions EMEA',
    'PCFS Federal Bi-weekly',
    'PCFS',
    'PDE-EMEA Office Standup',
    'PKS - Palo Alto',
    'PKS Support Weekly',
    'PKS support standup - AMER',
    'Paris',
    'Pivotal Tracker',
    'Sydney Developers',
    'apptx middle earth'
 ]


 const us_boards = [  // US boards only
    'App Transformation',
    'AppTX Leadership',
    'AppTX West',
    'AppTx .NET Practice',
    'AppTx Federal',
    'AppTx PL',
    'AppTx South',
    'Beaverton',
    'Boston',
    'Boulder',
    'CF - San Francisco',
    'Chicago Labs',
    'Denver Office',
    'ED Team Leads',
    'ED West',
    'Greenplum - Palo Alto',
    'Greenplum for Kubernetes',
    'Labs - Atlanta',
    'Labs - Austin',
    'Labs - Dallas',
    'Labs - San Francisco',
    'Labs - Santa Monica',
    'Labs - Seattle',
    'Labs - Washington, D.C.',
    'NY Office Standup',
    'PA-Federal',
    'PCFS',
    'PKS - Palo Alto',
    'PKS support standup - AMER',
    'Pivotal Tracker',
]


const boards = us_boards


 // # TODO make calendar event
const announcement = {
    author: 'Parents@Pivotal',
    title: 'Sign up for benefits for parents session on May 7th',
    description: `One of the goals of the Parents@ ERG is to increase awareness of Pivotal benefits that support parents + caregivers, and as mentioned at our launch last month we have partnered with the Benefits team to bring information sessions to you! We will run multiple sessions throughout the day on May 7! If you are interested, please sign up here: http://bit.ly/parents-benefits (feel free to share!)`,
    date: '2019-05-01',  // date in YYYY-MM-DD format
    selector: Selector('bogus')
}
announcement.selector = Selector('div.author').withText(announcement.author)


// PLEASE test this first on a local install of Whiteboard!!
// const page = 'http://localhost:8080/standups'
const page = 'https://whiteboard.pivotal.io/standups'


function insertMsg(boardname) {
    fixture('Modify: ' + boardname)

    test('Navigate', async t => {

        const link = Selector('a').withExactText(boardname)
        const addInteresting =  Selector('i.icon-plus-sign').nth(2)  // .nth(1)

        const standupName = Selector('div.navbar-header a.navbar-brand')
        const editHeader = Selector('div.block-header h2')

        await t
            .navigateTo(page)
            .expect(link.exists).ok(`Could not find board ${boardname}`)
            .click(link)
            .expect(standupName.textContent).contains(boardname)
            .expect(addInteresting.exists).ok()
            .expect(announcement.selector.exists).notOk(`A message by "${announcement.author}" already exists in ${boardname}, not inserting another.`)

            .click(addInteresting)
            // .expect(editHeader.textContent).contains("Help")  // 1
            .expect(editHeader.textContent).contains("Interesting")  // 2
            // .expect(editHeader.textContent).contains("Event")  // 3

        await enterinfo()
        // back at page with one standup:
        await t.expect(announcement.selector.exists).ok()
    })

}


async function enterinfo() {
    const title = Selector('#item_title')
    const author = Selector('#item_author')
    const description = Selector('#item_description')
    const date = Selector('#item_date')
    const submitbutton = Selector('input.btn')

    await t
        .expect(title.exists).ok()
        .expect(author.exists).ok()
        .expect(description.exists).ok()
        .expect(date.exists).ok()

        .typeText(title, announcement.title)
        .typeText(author, announcement.author)
        .typeText(description, announcement.description)
        //.selectText(date, {timeout: 50})
        .typeText(date, announcement.date, {replace:true})

        .expect(submitbutton.exists).ok()
        .click(submitbutton)
}


function main() {
    for (let board of boards) {
        insertMsg(board)
    }
}

main()
