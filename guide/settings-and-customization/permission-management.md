# Permission Management

Permission Management allows you to securely delegate the administration of your affiliate program to other team members without giving them full WordPress admin privileges. By default, only site administrators have complete control over FluentAffiliate. With this feature, you can appoint specific users as "Managers" and grant them granular access to view or manage different parts of your affiliate system.

Once a manager is assigned permissions, their view of the FluentAffiliate dashboard will be tailored specifically to what they are allowed to access; **they will only see the menus and data corresponding to their granted permissions**.

### Accessing Permission Management

To access this feature, navigate from your WordPress dashboard to **FluentAffiliate → Settings → Permission Management**.

![Permission Management](/images/settings-and-customization/permission-management/permission-management-1.webp)

### Adding a New Manager

When you first visit the page, you will see a prompt to add your first manager.

1.  Click the **“+ Add Manager”** button to begin. This will open the "Add Manager" sidebar.
2.  **Select a User:** In the "Select User" field, search for and choose an existing WordPress user on your site that you want to appoint as a manager.
3.  **Assign Permissions:** Below the user selection, you will see a list of available permissions. Check the boxes for the specific capabilities you want to grant to this manager. You can assign a combination of read-only and full-access permissions.
4.  Once you have configured their access, click the **“Add Manager”** button at the bottom of the sidebar to save. A success message will confirm that the manager has been added.

![Permission Management](/images/settings-and-customization/permission-management/permission-management-2.webp)

### Managing Existing Managers

After a manager is added, they will appear in a list on the Permission Management screen. For each manager, you can quickly see their name and all the permissions they currently have, displayed as tags.

To modify a manager’s access, use the icons on the right:

* **Edit Manager (Pencil Icon):** Click this to re-open the sidebar for that specific manager. You can then add or remove permissions by checking or unchecking the boxes and saving your changes.
* **Delete Manager (Trash Can Icon):** Click this to remove the user’s manager role. This will revoke all their FluentAffiliate permissions but **will not** delete their WordPress user account.

![Permission Management](/images/settings-and-customization/permission-management/permission-management-3.webp)

### Understanding the Available Permissions

The permissions you assign below directly control which menu items and data a manager can see and interact with inside the FluentAffiliate dashboard.

* **Read Access to All Affiliates:** Allows the manager to view the list of affiliates and their profiles.
* **Read & Write Access to All Affiliates:** Allows the manager to view, edit, approve, and reject affiliates.
* **Read Access to All Referrals:** Allows the manager to view all referral records.
* **Read & Write Access to All Referrals:** Allows the manager to view, edit, approve, and reject referrals.
* **Read Access to All Visits:** Allows the manager to view the affiliate link click/visit logs.
* **Read Access to All Payouts:** Allows the manager to view payout histories.
* **Read & Write Access to All Payouts:** Allows the manager to view, generate, and manage payouts.
* **Manage All Data and Settings:** Grants comprehensive access to all of the above, including FluentAffiliate's global settings. 