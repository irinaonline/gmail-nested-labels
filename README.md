# Gmail nested labels
This project contains a set of Google Apps scripts to improve the behavior of Gmail nested labels. When using labels in Gmail, the user can easily search all his emails which contain a single or set of labels. For instance, by simply including the words "label:foobar" in the search string, the Gmail will return all the emails which contain the label "foobar".

Besides simple labels, Gmail also allows the user to create nested labels, which are labels nested inside other labels. These nested labels are conveniently organized in an expandable hierarchy of labels in the Gmail interface. However, Gmail doesn't have any way to search the emails through a single parent label. For instance, if a user has two labels "bar1" and "bar2", both nested inside "foo", searching for the label "foo", e.g. "label:foo", won't return any email with the labels "bar1" or "bar2". This happens because although "bar1" and "bar2" are both nested inside "foo", the Gmail system actually maintains three completely unrelated labels: "foo", "foo/bar1" and "foo/bar2". Thus, searching for "label:foo" will only return the emails which contain the label "foo" and nothing else.

At the time of this writing, there is no simple search string to return all the emails which have any labels nested inside "foo". Searches like "label:foo&#42;" and "label:foo/&#42;" won't work either. The only available option is to mention every nested label in the search string, for instance, "label:foo/bar1 OR label:foo/bar2". However, this option is very tedious if you have a large number of nested labels. Also, when creating filters, you have to remember to update your filter's search string, every time you create a new nested label.

# Script: Apply hierarchical labels
This simple script is intended to fix the behavior of nested labels in Gmail. The script will search through all your emails, and every time it finds an email with a nested label, it will ensure the parent label is also applied. This way, the script will ensure that every email with a label "foo/bar1" or "foo/bar2" will also have the label "foo". Thus, to search for emails with labels nested inside "foo" just use the search string "label:foo".

Of course, the script works recursively - if an email has a single label "root/foo/bar", the script will also apply the labels "root/foo" and "root".

If you are like me though, your hierarchy of labels is large and becoming a mess. To organize the labels themselves, you soon start to use a label as a soft category, like "Old", "Done" or "Unused", and put all your infrequently used (or unsued) labels nested inside those.

For those labels, which I call soft-labels, the script would also work (of course) and apply the parent label "Old" or "Unused" whenever it finds an email with a label nested inside it. I think this behavior is, at least, not ideal. One reason for that is because labels might get in and out of soft-labels frequently. For instance, the label "CureOfCancer" might be nested inside the soft-label "OnHold" for some time, and then be removed from it. The problem of this usage pattern (my usage pattern :), is that the script would automatically apply the label "OnHold" on all your Gmail messages with "CureOfCancer", and moving the "CureOfCancer" out of "OnHold" will not automatically remove the "OnHold" labels. The script itself does not keep track of its actions, it doesn't know if the "OnHold" label was intentionally applied by the user.

To avoid this problem, soft-labels can be created with a name ending with the "-" (minus character), for instance "OnHold-". The script will not apply soft-labels then.

# Script: Sync starred to inbox pinned
Simple script to star/unstar a Gmail message which was pinned/unpinned inside the Inbox app. If you pin a message using the Inbox app, the email will be starred, otherwise, the email will be unstarred.

Well, ignore it if you don't use the Inbox app. When enabled, the star feature of Gmail will stop working - it will only mirror the state of messages pinned inside Inbox.

# Install
Create a project in Google Apps Script, paste the code inside it, and use the project triggers to execute the function once in a while. Project triggers can be scheduled at the menu Resources -> Current project's triggers.

I would recommend to 'Apply the hierarchical labels' once a hour, or a day. It may take some time to fix all your messages in the first runs, because it will go through your emails by batches, to avoid running for longer periods of time and exceeding the limits of Google Apps Script.

# Disclaimer
See LICENSE.txt
