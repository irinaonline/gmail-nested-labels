THREAD_COUNT_LIMIT = 50

function SyncStarredToInboxPinned()
{
  var threadCount = 0;

  Logger.log( "Syncing Gmail stars to Inbox pins" );

  // Star pinned messages

  var pinnedThreads = GmailApp.search( "is:pinned -is:starred", 0, THREAD_COUNT_LIMIT );

  for( var threadIndex = 0; threadIndex < pinnedThreads.length; ++threadIndex )
  {
    var thread = pinnedThreads[ threadIndex ];

    GmailApp.starMessages( thread.getMessages() );
    ++threadCount;

    //var subject = thread.getFirstMessageSubject();
    //Logger.log( "Starred thread: " + subject.substring( 0, 32 ) + ( subject.length > 32 ? "..." : "" ) );
  }

  // Unstar archived messages or unpinned

  var archivedStarredThreads = GmailApp.search( "is:starred -in:inbox", 0, THREAD_COUNT_LIMIT );

  for( var threadIndex = 0; threadIndex < archivedStarredThreads.length; ++threadIndex )
  {
    var thread = archivedStarredThreads[ threadIndex ];

    GmailApp.unstarMessages( thread.getMessages() );
    ++threadCount;

    //var subject = thread.getFirstMessageSubject();
    //Logger.log( "Unstarred thread: " + subject.substring( 0, 32 ) + ( subject.length > 32 ? "..." : "" ) );
  }

  var unpinnedThreads = GmailApp.search( "is:starred -in:pinned", 0, THREAD_COUNT_LIMIT );

  for( var threadIndex = 0; threadIndex < unpinnedThreads.length; ++threadIndex )
  {
    var thread = unpinnedThreads[ threadIndex ];

    GmailApp.unstarMessages( thread.getMessages() );
    ++threadCount;

    //var subject = thread.getFirstMessageSubject();
    //Logger.log( "Unstarred thread: " + subject.substring( 0, 32 ) + ( subject.length > 32 ? "..." : "" ) );
  }

  Logger.log( "Synced " + threadCount + " threads" );
}
