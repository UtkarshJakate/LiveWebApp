using System;
using System.Threading.Tasks;
using API.Controllers;
using Microsoft.AspNetCore.SignalR;
using System.Collections.Generic;
using System.Linq;

namespace API.HubConfig
{
    public class ChatHub : Hub {

        private readonly string _BotUser;
        private readonly IDictionary<string, UserConnection> _connections;
        private readonly IDictionary<string, string> _users;
        public ChatHub(IDictionary<string, UserConnection> connections, IDictionary<string, string> users){
            _BotUser = "Chat Bot";
            _connections = connections;
            _users = users;
        }

        public override Task OnDisconnectedAsync(Exception exception)
        {
            if (_connections.TryGetValue(Context.ConnectionId, out UserConnection userConnection))
            {
                _connections.Remove(Context.ConnectionId);
                Clients.Group(userConnection.Room).SendAsync("ReceiveMessage", _BotUser, $"{userConnection.User} has left");
                SendUsersConnected(userConnection.Room);
            }

            return base.OnDisconnectedAsync(exception);
        }

        public async Task JoinRoom(UserConnection userConnection){
            await Groups.AddToGroupAsync(Context.ConnectionId, userConnection.Room);
            await Clients.Group(userConnection.Room).SendAsync("ReceiveMessage", _BotUser,
                $"{userConnection.User} has joined {userConnection.Room}");

            _connections[Context.ConnectionId] = userConnection;
            _users[userConnection.User] = Context.ConnectionId;
            await SendUsersConnected(userConnection.Room);
        }


        public async Task sendPrivateMessage(string userId,string message){
            Console.WriteLine("********************** Private Message *********************");

            await Clients.Client(_users[userId])
                .SendAsync("PrivateMessages", _connections[Context.ConnectionId].User , message);
        }
        public async Task SendMessage(string message){
            if(_connections.TryGetValue(Context.ConnectionId, out UserConnection userConnection)){
                await Clients.Group(userConnection.Room)
                    .SendAsync("ReceiveMessage", userConnection.User, message);
            }
        }

        public async Task sendToSpecific(IReadOnlyList<string> users, string message){
            Console.WriteLine("********************** Specific Private Message *********************");
            List<string> req_clients = new List<string>();
            foreach(string user in users){
                req_clients.Add(_users[user]);
            }
            await Clients.Clients(req_clients.ToArray()).SendAsync("PrivateMessages",_connections[Context.ConnectionId].User,
            message);
        }
        public Task SendUsersConnected(string room)
        {
            var users = _connections.Values
                .Where(c => c.Room == room)
                .Select(c => c.User);

            return Clients.Group(room).SendAsync("UsersInRoom", users);
        }

    }
}