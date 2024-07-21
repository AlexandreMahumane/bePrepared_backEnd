import { db } from "../src/database"

interface Province {
    province: string;
    districts: string[];
}

const provinces: Province[] =[
    {
    province: 'Maputo Cidade',
    districts: ['Maputo']
    },
    {
    province: 'Zambézia',
    districts: [   
        "Alto Molócue",
        "Chinde",
        "Derre",
        "Gilé",
        "Gurué",
        "Ile",
        "Inhassunge",
        "Luabo",
        "Lugela",
        "Maganja da Costa",
        "Milange",
        "Mocuba",
        "Mocubela",
        "Molumbo",
        "Mopeia",
        "Morrumbala",
        "Mulevala",
        "Namacurra",
        "Namarroi",
        "Nicoadala",
        "Pebane",
        "Quelimane"
    ]
    },
    {
    province: 'Tete',
    districts: [    
        "Angónia",
        "Cahora-Bassa",
        "Changara",
        "Chifunde",
        "Chiuta",
        "Dôa",
        "Macanga",
        "Magoé",
        "Marara",
        "Marávia",
        "Moatize",
        "Mutarara",
        "Tete",
        "Tsangano",
        "Zumbo"
    ]
    },
    {
    province: 'Sofala',
    districts: [    
        "Beira",
        "Búzi",
        "Caia",
        "Chemba",
        "Cheringoma",
        "Chibabava",
        "Dondo",
        "Gorongosa",
        "Machanga",
        "Maringué",
        "Marromeu",
        "Muanza",
        "Nhamatanda"
    ]
    },
    {
    province: 'Niassa',
    districts: [
        "Chimbonila",
        "Cuamba",
        "Lago",
        "Lichinga",
        "Majune",
        "Mandimba",
        "Marrupa",
        "Maúa",
        "Mavago",
        "Mecanhelas",
        "Mecula",
        "Metarica",
        "Muembe",
        "N'gauma",
        "Nipepe",
        "Sanga"
    ]
    },
    {
    province: 'Nampula',
    districts: [    
        "Angoche",
        "Eráti",
        "Ilha de Moçambique",
        "Lalaua",
        "Larde",
        "Liúpo",
        "Malema",
        "Meconta",
        "Mecubúri",
        "Memba",
        "Mogincual",
        "Mogovolas",
        "Moma",
        "Monapo",
        "Mossuril",
        "Muecate",
        "Murrupula",
        "Nacala-a-Velha",
        "Nacala Porto",
        "Nacarôa",
        "Nampula",
        "Rapale",
        "Ribaué"
    ]
    },
    {
    province: 'Maputo',
    districts: [    
        "Boane",
        "Magude",
        "Manhiça",
        "Marracuene",
        "Matola",
        "Matutuíne",
        "Moamba",
        "Namaacha"
    ]
    },
    {
    province: 'Manica',
    districts: [    
        "Bárue",
        "Chimoio",
        "Gondola",
        "Guro",
        "Macate",
        "Machaze",
        "Macossa",
        "Manica",
        "Mossurize",
        "Sussundenga",
        "Tambara",
        "Vanduzi"
    ]
    },
    {
    province: 'Inhambane',
    districts: [    
        "Funhalouro",
        "Govuro",
        "Homoíne",
        "Inhambane",
        "Inharrime",
        "Inhassoro",
        "Jangamo",
        "Mabote",
        "Massinga",
        "Maxixe",
        "Morrumbene",
        "Panda",
        "Vilanculos",
        "Zavala"
    ]
    },
    {
    province: 'Gaza',
    districts: [
        'Bilene',
        'Chibuto',
        'Chicualacuala',
        'Chigubo',
        'Chókwè',
        'Chongoene',
        'Guijá',
        'Limpopo',
        'Mabalane',
        'Manjacaze',
        'Mapai',
        'Massangena',
        'Massingir', 
        'Xai-Xai'
    ]
    },
    {
    province: 'Cabo Delgado',
    districts: [
        'Ancuabe',
       ' Balama',
        'Chiúre',
        'Ibo',
        'Macomia',
        'Mecúfi',
        'Meluco',
        'Metuge',
        'Mocímboa da Praia',
        'Montepuez',
        'Mueda',
        'Muidumbe',
        'Namuno',
        'Nangade',
        'Palma',
        'Pemba', 
        'Quissanga'
    ]
    }
]

export async function seeds(){

   return Promise.all(
    provinces.map(async (province)=> {
    await db.province.create({
    data: {
        designation: province.province,
        Districts:{
            create: province.districts.map(district => 
            ({
                designation: district 
            }))

        }
    }
})
    })
)
}

seeds().then(()=>{
    console.log("seed created!")
})