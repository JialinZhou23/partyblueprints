'use strict';
const IdeaList = require( '../models/ideaList' );
console.log("loading the ideaList Controller")


// this displays all of the ideaLists
exports.getAllIdeaLists = ( req, res ) => {
  console.log('in getAllIdeaLists')
  console.dir(IdeaList) 
  IdeaList.find( {} )
    .exec()
    .then( ( ideaLists ) => {
      console.log("idealists = "+ideaLists)
      res.render( 'ideaLists', {
        ideaLists: ideaLists
      } );
    } )
    .catch( ( error ) => {
      console.log( error.message );
      return [];
    } )
    .then( () => {
      console.log( 'ideaList promise complete' );
    } );
};




exports.saveIdeaList = ( req, res ) => {
  console.log("in saveideaList!")
  console.dir(req)
  let newIdeaList= new IdeaList( {
    name: req.body.name,
    description: req.body.description
  } )

  console.log("ideaList = "+newIdeaList)

  newIdeaList.save()
    .then( () => {
      res.redirect( '/ideaLists' );
    } )
    .catch( error => {
      res.send( error );
    } );
};

exports.deleteIdeaList = (req, res) => {
  console.log("in deleteIdeaList")
  let ideaListName = req.body.deleteName
  if (typeof(ideaListName)=='string') {
    ideaList.deleteOne({name:ideaListName})
           .exec()
           .then(()=>{res.redirect('/ideaLists')})
           .catch((error)=>{res.send(error)})
  } else if (typeof(ideaListName)=='object'){
    IdeaList.deleteMany({name:{$in:ideaListName}})
           .exec()
           .then(()=>{res.redirect('/ideaLists')})
           .catch((error)=>{res.send(error)})
  } else if (typeof(ideaListName)=='undefined'){
      console.log("This is if they didn't select an ideaList")
      res.redirect('/ideaLists')
  } else {
    console.log("This shouldn't happen!")
    res.send(`unknown ideaListName: ${ideaListName}`)
  }

};
