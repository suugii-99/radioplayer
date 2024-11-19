document.addEventListener("DOMContentLoaded", () => {
const apiUrl = "http://api.sr.se/api/v2/channels?format=json&size=100";
const channelsContainer = document.getElementById("channels");
const searchInput = document.getElementById("search");
  
let channels = [];
  
// Hämta data från API
const fetchChannels = async () => {
    try {
const response = await fetch(apiUrl);
const data = await response.json();
    channels = data.channels;
    renderChannels(channels);
    } catch (error) {
console.error("Kunde inte hämta kanaler:", error);
    channelsContainer.innerHTML = "<p>Kunde inte ladda kanalerna.</p>";
    }
};
  
// Rendera kanaler
const renderChannels = (channelsList) => {
    channelsContainer.innerHTML = channelsList
    .map(channel => `
        <div class="channel" style="background-color: ${channel.color};">
        <img src="${channel.image}" alt="${channel.name}">
        <h2>${channel.name}</h2>
        ${
            
            channel.liveaudio.url
            ? `<audio controls>
                <source src="${channel.liveaudio.url}" type="audio/mpeg">
                Din webbläsare stöder inte ljudspelaren.
                </audio>`
            : "<p>Ljudström inte tillgänglig</p>"
        }
        </div>
        `)
        .join('');
    };
  
// Sökfunktion
searchInput.addEventListener("input", (e) => {
const searchValue = e.target.value.toLowerCase();
const filteredChannels = channels.filter(channel =>
    channel.name.toLowerCase().includes(searchValue)
      );
    renderChannels(filteredChannels);
    });
  
// Initiera
    fetchChannels();
});
  