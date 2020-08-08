const $form=document.querySelector('form');
const $input=document.querySelector('input');
const $location_btn=document.querySelector('#send-location');
const $messages=document.querySelector('#messages');

const messageTemplate=document.querySelector('#message-template').innerHTML;
const locationTemplate=document.querySelector('#location-template').innerHTML;
const sidebarTemplate=document.querySelector('#sidebar-template').innerHTML;

const {username,room}=Qs.parse(location.search,{igonreQueryPrefix:true});
const autoscroll=()=>{
    const $newMessage = $messages.lastElementChild;
    const newMessageStyles=getComputedStyle($newMessage);
    const newMessageMargin=parseInt(newMessageStyles.marginBottom);
    const newMessageHeight=$newMessage.offsetHeight+newMessageMargin;

    const visibleHeight = $messages.offsetHeight;
    const containerHeight = $messages.scrollHeight;
    const scrollOffet=$messages.scrollTop+visibleHeight;
    if(containerHeight-newMessageHeight <= scrollOffet){
        $messages.scrollTop = $messages.scrollHeight;
    }
}

const socket=io()

socket.on('message', (message)=>{
    const html = Mustache.render(messageTemplate,{
        username:message.username,
        message:message.text,
        createdAt:moment(message.createdAt).format('h:mm a')
    })
    $messages.insertAdjacentHTML('beforeend', html);
    autoscroll();
})
socket.on('locationMessage', (location)=>{
    const html=Mustache.render(locationTemplate,{
        username:location.username,
        location:location.text,
        createdAt:moment(location.createdAt).format('h:mm a')
    })
    $messages.insertAdjacentHTML('beforeend', html)
    autoscroll();
})
socket.on('roomData', ({room,users})=>{
    const html =Mustache.render(sidebarTemplate,{
        room,
        users
    })
    document.querySelector('#sidebar').innerHTML=html;
})