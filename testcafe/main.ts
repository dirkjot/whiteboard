import { Selector,t } from 'testcafe'

const boards = ['test1', 'test2','Stand Up With Spaces #3']

const serious_boards = ['Labs - Atlanta',
'Labs - Austin',
'Labs - Berlin',
'Labs - Dallas',
'Labs - Dearborn',
'Labs - Dearborn',
'Labs - Munich',
'Labs - San Francisco',
'Labs - Santa Monica',
'Labs - Seattle',
'Labs - Singapore',
'Labs - Sydney',
'Labs - Tokyo',
'Labs - Toronto',
'Labs - Washington, D.C.',
'Ann Arbor Labs',
'App Transformation',
'AppTx .NET Practice',
'AppTx EMEA',
'AppTx Federal',
'AppTX Leadership',
'apptx middle earth',
'AppTx PL',
'AppTx South',
'AppTX West',
'Beaverton',
'Boston',
'Boulder',
'Canada Field Teams',
'CF - Denver',
'CF - London Standup',
'CF - San Francisco',
'CF Garden',
'Chicago Labs',
'Cork',
'Denver Office',
'Dublin',
'London',
'London CloudFoundry Services',
'NY Office Standup',
'Paris',
'Palo Alto Office',
'PCFS',
'Pivotal Tracker' ]


const announcement = {
    author: 'Parents@Pivotal --- 3',
    title: 'Parents at Pivotal survey',
    description: `Calling all Pivot Parents + Caregivers! 
Please fill out this brief survey to help the Parents Employee Resource Group understand where to focus its efforts upon launch in early 2019: 
<https://goo.gl/forms/rnQWpa4G6DPU7V4U2>
`,
    selector: Selector('bogus')
}
announcement.selector = Selector('div.author').withText(announcement.author)


function insertMsg(boardname) {
    fixture('Modify: ' + boardname)
    const page = 'http://localhost:8080/standups'

    test('Navigate', async t => {

        const link = Selector('a').withExactText(boardname)
        const addInteresting =  Selector('i.icon-plus-sign').nth(1)

        //.nth(2)
              //Selector('h2').withText("Interestings")
              //.nextSibling('a').nth(0).find('i.icon-plus-sign')
        const standupName = Selector('div.navbar-header a.navbar-brand')
        const editHeader = Selector('div.block-header h2')
        
        await t
            .navigateTo(page)
            .click(link)
            .expect(standupName.textContent).contains(boardname)
            .expect(addInteresting.exists).ok()
            .expect(announcement.selector.exists).notOk(`A message by "${announcement.author}" already exists in ${boardname}, not inserting another.`)

            .click(addInteresting)
            .expect(editHeader.textContent).contains("Help")

        await enterinfo()
        // back at page with one standup:
        await t.expect(announcement.selector.exists).ok()              
    })

}


async function enterinfo() {
    const title = Selector('#item_title')
    const author = Selector('#item_author')
    const description = Selector('#item_description')
    const submitbutton = Selector('input.btn')

    await t
        .expect(title.exists).ok()
        .expect(author.exists).ok()
        .expect(description.exists).ok()
    
        .typeText(title, announcement.title)
        .typeText(author, announcement.author)
        .typeText(description, announcement.description)
        .debug()

        .expect(submitbutton.exists).ok()
        .click(submitbutton)
}


function main() {
    for (let board of boards) {
        insertMsg(board)
    }
}

main()
