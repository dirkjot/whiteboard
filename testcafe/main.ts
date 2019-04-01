import { Selector,t } from 'testcafe'

const boards = [
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
    'Finance - Pivotal Sales/PS',
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
    'RabbitMQ',
    'Sydney Developers',
    'apptx middle earth'
 ]


 // # TODO make calendar event
const announcement = {
    author: 'Parents@Pivotal',
    title: 'Parents@Pivotal ERG launch',
    description: `Parents@Pivotal ERG  (Employee Resource Group) launches on April 9th!  We are holding three information sessions to tell people about what we do, spread around the day so one should be convenient for your timezone.
To join one of the calls, or to join the ERG, visit https://forms.gle/qWUeHzDD5ZW9BQPd7, and don’t forget to sign up for one of our information sessions! Also, you can join #parents-at-pivotal for ERG updates and discussions about benefits and upcoming events.`,
    date: '2019-04-09',  // date in YYYY-MM-DD format
    selector: Selector('bogus')
}
announcement.selector = Selector('div.author').withText(announcement.author)


// PLEASE test this first on a local install of Whiteboard!!
const page = 'http://localhost:8080/standups'
// const page = 'https://whiteboard.pivotal.io/standups'


function insertMsg(boardname) {
    fixture('Modify: ' + boardname)

    test('Navigate', async t => {

        const link = Selector('a').withExactText(boardname)
        const addInteresting =  Selector('i.icon-plus-sign').nth(3)  // .nth(1)

        //.nth(2)
              //Selector('h2').withText("Interestings")
              //.nextSibling('a').nth(0).find('i.icon-plus-sign')
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
            // .expect(editHeader.textContent).contains("Help")
            .expect(editHeader.textContent).contains("Event")

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
