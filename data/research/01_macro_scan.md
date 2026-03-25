# 宏观扫描：分布式系统教材、课程与教程

## 一、经典教科书

| 书名 | 作者 | 年份 | 受众 | 组织方式 | 教学策略 | 影响力 |
|------|------|------|------|----------|----------|--------|
| DDIA (Designing Data-Intensive Applications) | Martin Kleppmann (剑桥) | 2017; 第2版 2026.02 | 后端工程师、架构师 | 按系统层次递进：单机 -> 分布式 -> 派生数据 | 混合：理论 + 工业案例 | Goodreads 4.71/5，业界"分布式圣经" |
| Distributed Systems: Principles and Paradigms | Tanenbaum & van Steen (阿姆斯特丹) | 第4版 2023 | 本科高年级/研究生 | 按概念分章（7大原则） | 纯理论 + Python 示例 | 全球数百所大学采用，第4版免费在线 |
| Distributed Systems: Concepts and Design | Coulouris 等 (伦敦大学) | 第5版 2011 | 本科高年级/研究生 | 按系统层次：基础 -> 中间件 -> 算法 | 混合：理论 + 工业案例 | 全球经典教科书 |
| Distributed Algorithms | Nancy Lynch (MIT) | 1996 | 研究生/研究人员 | 按系统模型（同步/异步） | 纯理论：I/O 自动机形式化 + 证明 | 学术引用量极高 |
| Intro to Reliable and Secure Distributed Programming | Cachin, Guerraoui, Rodrigues | 第2版 2011 | 研究生/研究人员 | 按抽象层次递增 | 纯理论：每章一个编程抽象 + 算法 | 分布式编程抽象领域标准教材 |
| Distributed Computing: Principles, Algorithms, and Systems | Kshemkalyani & Singhal | 2008 | 研究生 | 原理 -> 算法 -> 系统 | 混合 | 多所大学研究生课程采用 |
| Distributed Systems: An Algorithmic Approach | Sukumar Ghosh | 第2版 2014 | 研究生 | 按算法主题 | 纯理论 | 算法导向教学代表 |

## 二、知名公开课

| 课程 | 机构/讲师 | 更新 | 受众 | 教学策略 | 影响力 |
|------|-----------|------|------|----------|--------|
| MIT 6.5840 (原 6.824) | MIT PDOS (Robert Morris 等) | Spring 2026 | 研究生 | 论文精读 + 4 个递进 Lab (Go) | 全球最知名分布式系统课程 |
| CMU 15-440/640 | CMU (Satyanarayanan 等) | Fall 2025 | 本科/研究生 | 项目驱动：4 个月度项目 (Go) | CMU CS 核心课程 |
| Stanford CS244b | Stanford (Mazieres) | Spring 2024 | 研究生 | 论文 + 短编程 + 团队研究项目 | Stanford 旗舰课程 |
| ETH Zurich Distributed Systems | ETH DISCO (Wattenhofer) | HS 2024 | 本科高年级/研究生 | 翻转课堂 + 讨论 | 配套免费教材 |

## 三、开源教程/项目

| 项目 | 作者 | 受众 | 教学策略 | 影响力 |
|------|------|------|----------|--------|
| Fly.io Gossip Glomers | Fly.io + Kyle Kingsbury | 后端工程师 | 纯项目驱动：6 个递进挑战，Maelstrom 平台 | 社区解决方案众多 |
| PingCAP Talent Plan | PingCAP (TiDB 团队) | Rust/Go 开发者 | 纯项目驱动：实现 TinyKV/TinySQL | ~10.7k GitHub stars |
| Distributed Systems for Fun and Profit | Mikito Takada | 入门者 | 轻量理论概述：5 章在线电子书 | ~2.6k GitHub stars |

## 四、中文教材/课程

| 名称 | 作者 | 年份 | 特点 |
|------|------|------|------|
| 《深入理解分布式系统》 | 唐磊 | 2022 | 理论 + Go 实现 Paxos |
| 极客时间：分布式系统案例课 | 平台课程 | 持续更新 | 案例驱动 |
| 极客时间：左耳听风（分布式架构篇） | 陈皓 | 2018 | 读书/论文导引 |
| CS 自学指南 (csdiy.wiki) | 社区 | 持续更新 | MIT 6.824 学习指南 |

## 五、按教学策略分类

### 纯理论型
Lynch、Cachin/Guerraoui/Rodrigues、Ghosh、Distributed Systems for Fun and Profit

### 混合型（理论 + 案例）— 市场主流
DDIA、Tanenbaum、Coulouris、ETH Zurich 课程

### 项目驱动型
MIT 6.5840、CMU 15-440、Fly.io Gossip Glomers、PingCAP Talent Plan

### 论文/研究驱动型
Stanford CS244b、MIT 6.5840

## 六、市场空白

1. **缺乏"理论推导到系统实现"一体化教材**：现有教材要么偏理论要么偏案例分析，没有一本从原理推导到完整实现的全流程覆盖
2. **中文原创高质量教材匮乏**：主要依赖翻译版和在线课程碎片
3. **面向现代云原生的教材更新滞后**：多数经典教材内容偏传统（DDIA 第2版是唯一例外）
4. **交互式/实验平台型教学资源稀缺**：除 Fly.io Gossip Glomers 外缺少可验证正确性的实验平台

## 七、深入分析对象

1. DDIA — 混合型最佳代表
2. Tanenbaum 第4版 — 学术教科书标杆
3. MIT 6.5840 — 项目驱动最佳范例

Sources: dataintensive.net, distributed-systems.net, pdos.csail.mit.edu/6.824, composablesystems.org/15-440, disco.ethz.ch, fly.io/dist-sys, github.com/pingcap/talent-plan, book.mixu.net/distsys, csdiy.wiki
