<!-- readmy:template=016-data-dashboard;version=2.0.0;composants=banner@2.0.0,identity@2.0.0,metrics@2.0.0,prose@2.0.0,stack@2.0.0,projects@2.0.0,principles@2.0.0,links@2.0.0,colophon@2.0.0 -->

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="./assets/banner-dark.svg" />
  <source media="(prefers-color-scheme: light)" srcset="./assets/banner-light.svg" />
  <img alt="Bandeau : Roman Kowalski, Staff Data Streaming &amp; OLAP Platform Engineer" src="./assets/banner-light.svg" />
</picture>

<h1>Roman Kowalski</h1>
<p>Staff Data Streaming &amp; OLAP Platform Engineer</p>
<!-- section:organisation omise : champ absent -->
<!-- section:lieu omise : champ absent -->

<table width="100%">
<tbody>
  <tr>
    <td width="25%" align="center">
      <h4>3.8M / s</h4>
      <p><strong>Événements / Sec</strong><br/><small>Kafka Cluster 120 Partitions</small></p>
    </td>
    <td width="25%" align="center">
      <h4>&lt; 8ms</h4>
      <p><strong>Latence Ingestion</strong><br/><small>End-to-End Pipeline</small></p>
    </td>
    <td width="25%" align="center">
      <h4>45 To / jour</h4>
      <p><strong>Volume Journalier</strong><br/><small>ClickHouse Tiering</small></p>
    </td>
    <td width="25%" align="center">
      <h4>84 Actifs</h4>
      <p><strong>Jobs Flink</strong><br/><small>Exactly-Once Semantics</small></p>
    </td>
  </tr>
</tbody>
</table>

<h2>En bref</h2>
<p>Je construis les autoroutes de données temps réel : streaming distribué, sémantique exactly-once et requêtes analytiques sub-secondes.</p>
<p>Optimisation des topologies Apache Flink, partitionnement ClickHouse et format Apache Iceberg sur stockage objet.</p>

<h2>Stack</h2>
<ul>
<li><strong>Streaming Engine</strong> — Apache Kafka, Apache Flink, Rust, Vector</li>
<li><strong>Analytics &amp; Storage</strong> — ClickHouse, Apache Iceberg, DuckDB, Parquet</li>
</ul>

<h2>Projets</h2>
<table width="100%">
<tbody>
  <tr>
    <td width="50%" valign="top">
      <h3><a href="https://github.com/example-user/flink-sink">Flink-Delta-Sink</a></h3>
      <p>Connecteur Flink haute performance pour l'ingestion sans compaction vers tables Iceberg.</p>
      <p><sub> · <code>Java</code> · ★ 1290</sub></p>
    </td>
    <td width="50%" valign="top">
      <h3><a href="https://github.com/example-user/ch-proxy">Fast-ClickHouse-Proxy</a></h3>
      <p>Proxy d'équilibrage et de mise en cache de requêtes analytiques avec déduplication de requêtes identiques.</p>
      <p><sub> · <code>Go</code> · ★ 870</sub></p>
    </td>
  </tr>
</tbody>
</table>

<h2>Principes</h2>
<ul>
<li>La latence d'ingestion se perd dans les sérialisations inutiles : vive Arrow et FlatBuffers.</li>
<li>Chaque schéma doit être versionné et validé avant d'entrer dans le topic.</li>
<li>Une donnée non requêtée dans les 90 jours va au stockage froid.</li>
</ul>

<h2>Liens</h2>
<p><a href="https://github.com/example-user">GitHub</a> · <a href="https://example.com/data-metrics">Observabilité Data</a> · <a href="https://example.com/notes">Architecture Notes</a></p>

<p><sub>Profil généré par ReadMy 016-data-dashboard 2.0.0. Images SVG locales, aucun service tiers.</sub></p>
