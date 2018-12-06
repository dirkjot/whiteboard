import { Selector,t } from 'testcafe'

const boards = [
'Sydney Developers',
'Labs - Sydney',
'Ann Arbor Labs',
'APJ Pivotal Support Daily Standup',
'App Transformation',
'AppTx .NET Practice',
'AppTx EMEA',
'AppTx Federal',
'AppTX Leadership',
'apptx middle earth',
'AppTx PL',
'AppTx South',
'AppTX West',
'BCS Daily Standup',
'Beaverton',
'Boston',
'Boulder',
'Canada Field Teams',
'Central EMEA',
'CF - Denver',
'CF - London Standup',
'CF - San Francisco',
'CF Garden',
'Chicago Labs',
'Cloud Planner',
'Cloudops Beijing',
'CloudOps EU Stand-Up',
'CloudOps GAP',
'CloudOps SF',
'CloudOps-PWS Standup',
'Cork',
'Cork - DATA',
'Cork - PaaS',
'CSR Stand Up',
'Data - Beijing',
'Data Innovation Labs Standup',
'Data Platform Engineering',
'Denver Office',
'Designers - DC',
'Diversity Council',
'Dublin',
'East Coast PM Townhall',
'ED Team Leads',
'ED West',
'EE-DATA',
'EMEA Board',
'EMEA Operations',
'EMEA Product Team',
'Engagement Director',
'Escalation Management',
'Finance - Pivotal Sales/PS',
'FinOpS Analyst',
'GP Toolsmiths',
'Greenplum - Palo Alto',
'Greenplum for Kubernetes',
'HAWQ Support',
'HCL Enablement',
'IAD Test',
'Infosec-Wolfe',
'k8s-c10s',
'Labs - Atlanta',
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
'Labs - Tokyo',
'Labs - Toronto',
'Labs - Washington, D.C.',
'LATAM Sales',
'London',
'London CloudFoundry Services',
'NE PA Team',
'NY Office Standup',
'PA Toolsmiths',
'PA-Federal',
'PA-PacWest',
'PaaS Support Retro',
'Pair Exchange Digest',
'Palo Alto Office',
'Paris',
'PCF Autoscaler',
'PCF Cassandra',
'PCF RabbitMQ',
'PCF Redis',
'PCF Services Enablement',
'PCF Solutions EMEA',
'PCF+Photon',
'PCFS',
'PCFS (Beach)',
'PCFS - Pivotal Support',
'PCFS - Platform Operations',
'PCFS Federal Bi-weekly',
'PCFS Leadership',
'PCFS Product Managers',
'PCFS- ED-PA Updates',
'PDE Services',
'PDE-EMEA Office Standup',
'Pivotal Bosch Team',
'Pivotal Support APAC',
'Pivotal Tracker',
'Pivotal Web Services (Production)',
'PKS - Palo Alto',
'PKS support standup - AMER',
'PKS Support Weekly',
'Platform Reliability Engineering',
'RabbitMQ',
'RabbitMQ SME',
'Raytheon BAT',
'Seattle Anchors',
'Starsec Stand Up',
'StubHub BAT',
'sup-gpdb-cat-storage standup',
'Support Data AMER Standup',
'Tracker on GCP',
'Transformation Practice',
'VMware-Collaboration',
'WestCorp Account Team'
 ]


const announcement = {
    author: 'Parents@Pivotal',
    title: 'Parents at Pivotal survey',
    description: `Calling all Pivot Parents + Caregivers! 
Please fill out this brief survey to help the Parents Employee Resource Group understand where to focus its efforts upon launch in early 2019: 
<https://goo.gl/forms/rnQWpa4G6DPU7V4U2>
`,
    date: '2018-12-04',  // date in YYYY-MM-DD format
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
        const addInteresting =  Selector('i.icon-plus-sign').nth(1)

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
