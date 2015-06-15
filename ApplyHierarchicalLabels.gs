THREAD_COUNT_LIMIT = 50

function IsSoftLabel( str ) 
{
  var suffix = '-';
  return str.indexOf( suffix, str.length - suffix.length ) !== -1;
}

function ApplyHierarchicalLabels() 
{
  var userLabels = GmailApp.getUserLabels();
  var threadCount = 0;
  
  Logger.log( "Applying Gmail hierarchical labels" );
  
  for( var labelIndex = 0; labelIndex < userLabels.length; ++labelIndex )
  {
    var label = userLabels[ labelIndex ];
    var labelPath = label.getName().split( '/' );

    for( var pathIndex = labelPath.length; pathIndex > 1; --pathIndex )
    {
      if( threadCount > THREAD_COUNT_LIMIT )
        return;
      
      var childName = labelPath.slice( 0, pathIndex ).join( '/' );
      
      if( IsSoftLabel( childName ) ) 
        continue;

      var parentIndex = pathIndex;
      do 
      {
        --parentIndex;
        var parentName = labelPath.slice( 0, parentIndex ).join( '/' );
      } while( IsSoftLabel( parentName ) )
        
      var parentLabel = GmailApp.getUserLabelByName( parentName );
      if( !parentLabel )
        continue;
      
      var threads = GmailApp.search( "label:" + childName + " -label:" + parentName, 0, THREAD_COUNT_LIMIT );
      
      for( var threadIndex = 0; threadIndex < threads.length; ++threadIndex )
      {
        var thread = threads[ threadIndex ];
        
        thread.addLabel( parentLabel );
        ++threadCount;
        
        //var subject = thread.getFirstMessageSubject();
        //Logger.log( "Added label '" + parentName + "' to thread: " + subject.substring( 0, 32 ) + ( subject.length > 32 ? "..." : "" ) ); 
      }
    }
  }    

  Logger.log( "Applied labels over " + threadCount + " thread(s)" );
}
