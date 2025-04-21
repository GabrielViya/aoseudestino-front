<template>
    <TheTopo/>

    <div id="map"></div>
    <div id="output"></div>
    <TheBarraMenu/>
</template>

<script>
    import TheBarraMenu from "@/components/TheBarraMenu.vue"
    import TheTopo from "@/components/TheTopo.vue"
    
    export default {
        components: {
            TheBarraMenu,
            TheTopo
        },
    
        mounted() {

            let map = L.map('map').setView([-15.018831, 13.371827], 10);
            const apiKey = '5b3ce3597851110001cf62482352f1eb83954bd4a208d48b42340870';

            // Tile Layer
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                maxZoom: 19,
                attribution: '© OpenStreetMap'
            }).addTo(map);

            // Coordenadas de destino fixas
            const start = [13.37182783391541, -15.018831319436073];

            function getLocationAndRoute() {
                navigator.geolocation.getCurrentPosition(
                    function (position) {
                        const lat = position.coords.latitude;
                        const lng = position.coords.longitude;

                        const end = [lng, lat];

                        document.getElementById("output").innerHTML = `
                            <br> Latitude atual: ${lat} <br>
                            Longitude atual: ${lng}
                        `;

                        // Requisição à API OpenRouteService
                        fetch('https://api.openrouteservice.org/v2/directions/driving-car/geojson', {
                            method: 'POST',
                            headers: {
                                'Authorization': apiKey,
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({
                                coordinates: [start, end]
                            })
                        })
                        .then(response => response.json())
                        .then(data => {
                            const geojson = L.geoJSON(data, {
                                style: {
                                    color: 'blue',
                                    weight: 4
                                }
                            }).addTo(map);

                            // Ajusta a visualização do mapa para caber na rota
                            map.fitBounds(geojson.getBounds());

                            // Marcadores
                            L.marker([start[1], start[0]]).addTo(map).bindPopup("Início").openPopup();
                            L.marker([end[1], end[0]]).addTo(map).bindPopup("Destino");
                        })
                        .catch(error => console.error('Erro ao traçar rota:', error));
                    },
                    function (error) {
                        document.getElementById("output").innerText = "Erro ao obter localização: " + error.message;
                    },
                    {
                        enableHighAccuracy: true,
                        timeout: 10000,
                        maximumAge: 0
                    }
                );
            }

            getLocationAndRoute();
        }
    }
</script>

<style>

</style>