<template>
  <div id="home">
    <h1>서비스 목록</h1>
    <table id="services">
      <tbody>
        <tr>
          <td>
            <router-link :to="{ name: 'service-apikey' }">
              <div><i class="material-icons">vpn_key</i></div>
              <div class="service-name">API Key</div>
            </router-link>
          </td>
          <td>
            <router-link :to="{ name: 'service-keyvalue' }">
              <div><i class="material-icons">storage</i></div>
              <div class="service-name">Key Value</div>
            </router-link>
          </td>
          <td>
            <router-link :to="{ name: 'service-storage' }">
              <div><i class="material-icons">file_copy</i></div>
              <div class="service-name">Storage</div>
            </router-link>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style lang="scss" scoped>
#home {
  table#services {
    width: 100%;
    table-layout: fixed;
    text-align: center;

    tr td {
      padding: 10px 0;

      i.material-icons {
        font-size: 36px;
      }

      a {
        text-decoration: none;
      }

      &:hover {
        background-color: #424242;
      }
    }
  }
}
</style>
