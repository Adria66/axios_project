

//1. Requerir mongoose
const mongoose  = require('mongoose');
const chalk     = require('chalk')
const db        = 'exampleApp'

//2. Conectar mongoose con el metodo connect(). El primer argumento es el enlace a la base de datos que tenemos guardada en mongo (en local) y el segundo argumento son una serie de instrucciones que tenemos que indicarle a mongoose para que funcione.
mongoose.connect(`mongodb://localhost/${db}`, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then((result)=>{
    console.log(chalk.blue(`Connected to Mongo! ${result.connections[0].name}`))
})
.catch((error)=>{
    console.log(chalk.red(`There has been an error: ${error}`))
})

//6. Crear Schema
const Schema = mongoose.Schema

const studentSchema = new Schema ({
    name: {type: String, required: true},
    age: Number,
    date: Date,
    registered: Boolean,
    grades: Array 
})


//3. Crear el modelo. Modelo --> Clase --> Plantilla. Para comunicarnos con la base de datos, tenemos que hacerlo a traves del modelo
// const Student = mongoose.model('Student', 
//  {
//     name: String,
//     age: Number,
//     date: Date,
//     registered: Boolean,
//     grades: Array
//  }
// )
// 3.(6) Tambien se puede hacer con Schemas (Plantilla)
const Student = mongoose.model('Student', studentSchema) // Aquí utilizamos el esquema del apartado 6

//4. Crear una instancia del modelo firsStudent y pasarle como argumento la informacion que queremos añadir
const firstStudent = new Student(
 {
    name: 'Adria',
    age: 28,
    date: '1992-04-27',
    registered: true,
    grades: [4, 4, 5, 6, 8, 4]

 }
)

//5. Guardar el estudiante en la base de datos
firstStudent.save()
.then((result) =>{
    console.log(result)
})
.catch((error) =>{
    console.log(error)
})

//Callback y Promises es lo mismo
// Student.find({}, (error, students)=>{
//     if(error){
//         console.log(error)
//         return
//     }
//     console.log(students)
// })

//Promises y Callback es lo mismo (MEJOR OPCION)

Student.find({name: 'Adria'}, {name: 1, _id: 0}, {sort: {name: 1}})
.then((students)=>{

})
.catch((error)=>{

})


//CRUD actions

//CREATE --> Crear nuevo documento --> <instancia de modelo>.save()

//CREATE --> Otra alternativa para crear un documento: Modelo.create()

//READ --> Leer todos los documentos de nuestro Modelo (que a su vez corresponde a la coleccion)

//UPDATE -->