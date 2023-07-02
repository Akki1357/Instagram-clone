import { USERS } from "./Users";

export const POSTS = [
    {
        imageurl : 'https://images.pexels.com/photos/1861594/pexels-photo-1861594.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        user : USERS[0].user,
        likes : 7780,
        caption : 'looking..... at the weather....❤️',
        profile_picture : USERS[0].Image,
        comments : [
            {
                user : 'dishu',
                comment : 'wow....looking soooo smart'
            },
            {
                user : 'nisha',
                comment : 'hehe...where r u going...'
            }
        ]
    },

    {
        imageurl : 'https://images.pexels.com/photos/1212984/pexels-photo-1212984.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        user : USERS[1].user,
        likes : 9453,
        caption : 'going to home.....',
        profile_picture : USERS[1].Image,
        comments : [
            {
                user : 'dishu',
                comment : 'wow....looking soooo smart'
            },
            {
                user : 'nisha',
                comment : 'hehe...'
            }
        ]
    }
]